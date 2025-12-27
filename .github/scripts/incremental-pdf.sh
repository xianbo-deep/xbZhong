#!/bin/bash
set -e
set -o pipefail

# 1. 强制使用 UTF-8
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# --- 路径定义 ---
CURRENT_DIR=$(pwd)
STATIC_BASE_DIR="$CURRENT_DIR/docs/.vuepress/public"
INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
CSS_FILE="$STATIC_BASE_DIR/typora.css" # 样式文件路径

EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*" "docs/.vuepress/public/*")

# --- 检查工具 ---
if ! command -v pandoc &> /dev/null; then echo "!!! CRITICAL: pandoc not found."; exit 1; fi
if ! command -v chromium &> /dev/null; then echo "!!! CRITICAL: chromium not found."; exit 1; fi

mkdir -p "$MAPPING_DIR"
if [ ! -f "$MAP_FILE" ]; then echo "{}" > "$MAP_FILE"; fi
echo "{}" > "$TEMP_UPDATE_FILE"

total_files=0
success_count=0
fail_count=0
total_size=0

# 确保 CSS 存在
if [ ! -f "$CSS_FILE" ]; then
    echo "⚠️ Warning: typora.css not found at $CSS_FILE, using default browser styles."
    # 创建一个空文件防止 pandoc 报错
    touch "$CSS_FILE"
fi

echo ">>> Start scanning (Pandoc + Chromium Engine)..."

# 遍历文件
while IFS= read -r -u9 file; do
    if [[ "$(basename "$file")" == "README.md" ]]; then continue; fi

    skip=false
    for e in "${EXCLUDE[@]}"; do
        # 简单的通配符匹配
        if [[ "$e" == *"*"* ]]; then
            prefix="${e%/*}"
            if [[ "$file" == "$prefix"* ]]; then skip=true; break; fi
        elif [[ "$file" == "$e" ]]; then 
            skip=true; break; 
        fi
    done
    if [ "$skip" = true ]; then continue; fi
    
    # 提前计算 PDF 路径，用于判断文件是否存在
    rel_path="${file#$INPUT_DIR/}"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"

    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    # 只有当 hash 一致 且 目标 PDF 文件存在时，才跳过
    if [ "$last_hash" = "$current_hash" ] && [ -f "$pdf_path" ]; then
        # echo "[Unchanged] $file"
        continue
    fi

    echo ">>> Processing $file ..."

    web_pdf_path="/pdfs/${rel_path%.md}.pdf"
    # pdf_path 已在上面定义
    mkdir -p "$(dirname "$pdf_path")"

    # 提取图片
    img_list=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" || true)
    if [ -z "$img_list" ]; then
        images="[]"
    else
        images=$(echo "$img_list" | while read -r img; do echo "$img"; done | jq -R -s -c 'split("\n")[:-1]')
    fi

    tmp_file="$(mktemp).md"
    html_file="$(mktemp).html"

    # --- 预处理 ---
    # 修复图片路径，使其指向本地绝对路径
    sed -E "s|!\[([^]]*)\]\(/|![\1]($STATIC_BASE_DIR/|g" "$file" > "$tmp_file"
    
    # --- 准备 Highlight.js (使用本地文件) ---
    # 注入本地 CSS 和 JS
    # 使用 sed 替换模板中的变量
    sed "s|{{STATIC_BASE_DIR}}|$STATIC_BASE_DIR|g" ".github/scripts/pdf-header-template.html" > highlight_header.html

    set +e
    
    # 1. 转 HTML
    # --no-highlight: 禁用 Pandoc 自带高亮，交给 highlight.js
    # --include-in-header: 注入 JS/CSS
    pandoc "$tmp_file" \
        -o "$html_file" \
        --standalone \
        --css="$CSS_FILE" \
        --resource-path="$STATIC_BASE_DIR" \
        --metadata pagetitle="$(basename "$file" .md)" \
        --no-highlight \
        --include-in-header="highlight_header.html" \
        --mathjax="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" \
        -V lang=zh-CN \
        -V mainfont="Noto Sans CJK SC"

    pandoc_exit_code=$?
    rm highlight_header.html

    # 2. Chrome 打印
    if [ $pandoc_exit_code -eq 0 ]; then
        # --virtual-time-budget=10000: ⚠️ 增加到 10秒
        # 这是为了等待 MathJax JS 脚本下载并执行完毕，否则公式还是源代码
        chromium \
            --headless \
            --disable-gpu \
            --no-sandbox \
            --disable-dev-shm-usage \
            --disable-software-rasterizer \
            --run-all-compositor-stages-before-draw \
            --print-to-pdf="$pdf_path" \
            --no-pdf-header-footer \
            --virtual-time-budget=10000 \
            "file://$html_file"
        
        exit_code=$?
    else
        exit_code=1
    fi
    
    set -e
    rm "$tmp_file" "$html_file"

    if [ $exit_code -eq 0 ] && [ -s "$pdf_path" ]; then
        echo "    ✅ [Success] $pdf_path"

        # --- 链接注入逻辑 (保持不变) ---
        link_md="[本页PDF]($web_pdf_path)"
        if ! grep -Fq "$link_md" "$file"; then
            if grep -q "\[本页PDF\](/pdfs/" "$file"; then sed -i '/\[本页PDF\](\/pdfs\//d' "$file"; fi
            
            # Escape & for sed replacement
            link_md_safe="${link_md//&/\\&}"

            if [[ "$(head -n 1 "$file")" == "---" ]]; then
                end_fm_line=$(grep -n "^---$" "$file" | sed -n '2p' | cut -d: -f1)
                if [[ -n "$end_fm_line" ]]; then 
                    # Use s command to append after line, handling newlines correctly
                    sed -i "${end_fm_line}s|$|\n\n$link_md_safe\n|" "$file"
                else 
                    sed -i "1s|^|$link_md_safe\n\n|" "$file"
                fi
            else
                sed -i "1s|^|$link_md_safe\n\n|" "$file"
            fi
            current_hash=$(sha256sum "$file" | cut -d' ' -f1)
        fi
        
        pdf_size=$(stat -c%s "$pdf_path")
        gen_time=$(TZ="Asia/Shanghai" date +%Y-%m-%dT%H:%M:%S)

        jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg hash "$current_hash" \
            --arg size "$pdf_size" --arg gen_time "$gen_time" \
            '.[$key] = {pdf:$pdf, images:$imgs, hash:$hash, size:$size, gen_time:$gen_time}' \
            "$MAP_FILE" > tmp_map.json && mv tmp_map.json "$MAP_FILE"

        jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg size "$pdf_size" --arg gen_time "$gen_time" \
            '.[$key] = {pdf:$pdf, images:$imgs, size:$size, gen_time:$gen_time}' \
            "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

        total_files=$((total_files + 1))
        total_size=$((total_size + pdf_size))
        success_count=$((success_count + 1))
    else
        echo "    ❌ [Failed] Chrome error on $file"
        fail_count=$((fail_count + 1))
    fi

done 9< <(find "$INPUT_DIR" -type f -name "*.md" | sort)

# 清理僵尸数据
echo ">>> Checking for obsolete files..."
jq -r 'keys[]' "$MAP_FILE" | while read -r key; do
    if [ ! -f "$key" ]; then
        echo "Source file missing: $key"
        
        # 1. 删除对应的 PDF 文件
        pdf_path=$(jq -r --arg k "$key" '.[$k].pdf // empty' "$MAP_FILE")
        if [[ -n "$pdf_path" && -f "$pdf_path" ]]; then
            rm "$pdf_path"
            echo "Deleted orphan PDF: $pdf_path"
        fi
        
        # 2. 从 mapping.json 中删除
        jq --arg k "$key" 'del(.[$k])' "$MAP_FILE" > tmp_map_clean.json && mv tmp_map_clean.json "$MAP_FILE"
    fi
done

jq --arg total_files "$total_files" \
   --arg total_size "$total_size" \
   --arg success_count "$success_count" \
   --arg fail_count "$fail_count" \
   '.summary = {
       total_files: ($total_files|tonumber), 
       total_size: ($total_size|tonumber),
       success_count: ($success_count|tonumber),
       fail_count: ($fail_count|tonumber)
   }' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "---------------------------------------------------"
echo "Run completed! (Chrome Engine)"
echo "Success: $success_count"
echo "Failed:  $fail_count"