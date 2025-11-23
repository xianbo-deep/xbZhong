#!/bin/bash
set -e
set -o pipefail

# 1. 强制使用 UTF-8
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# --- 【关键修复1】获取硬盘绝对路径 ---
# 只有用绝对路径，PDF 工具才能 100% 找到图片
WORK_DIR=$(pwd)
INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
# 图片实际存放的物理位置
PUBLIC_PATH="docs/.vuepress/public"

MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*")

# --- 准备工作 ---
echo ">>> Installing md-to-pdf locally..."
npm install md-to-pdf --no-save --silent

MTP_CMD="./node_modules/.bin/md-to-pdf"

if [ ! -f "$MTP_CMD" ]; then
    echo "!!! CRITICAL: md-to-pdf executable not found at $MTP_CMD"
    exit 1
fi

command -v jq >/dev/null 2>&1 || echo "Please install jq"
mkdir -p "$MAPPING_DIR"
if [ ! -f "$MAP_FILE" ]; then echo "{}" > "$MAP_FILE"; fi
echo "{}" > "$TEMP_UPDATE_FILE"

total_files=0
success_count=0
fail_count=0
total_size=0

echo ">>> Start scanning..."

# 循环遍历
while IFS= read -r -u9 file; do
    if [[ "$(basename "$file")" == "README.md" ]]; then continue; fi

    skip=false
    for e in "${EXCLUDE[@]}"; do
        if [[ "$file" == $e ]]; then skip=true; break; fi
    done
    if [ "$skip" = true ]; then 
        echo "[Excluded] $file"
        continue
    fi
    
    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    if [ "$last_hash" = "$current_hash" ]; then
        echo "[Unchanged] $file"
        continue
    fi

    echo ">>> Processing $file ..."

    rel_path="${file#$INPUT_DIR/}"
    web_pdf_path="/pdfs/${rel_path%.md}.pdf"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    # 提取图片逻辑 (用于JSON)
    img_list=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" || true)
    if [ -z "$img_list" ]; then
        images="[]"
    else
        images=$(echo "$img_list" | while read -r img; do
            echo "$IMAGE_PREFIX/$img"
        done | jq -R -s -c 'split("\n")[:-1]')
    fi

    tmp_file="$(mktemp).md"

    # --- 【关键修复2】图片路径替换为硬盘绝对路径 ---
    # 将 ![](/images/xx.png) 替换为 ![](/home/runner/.../docs/.vuepress/public/images/xx.png)
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($WORK_DIR/$PUBLIC_PATH/|g" "$file" > "$tmp_file"

    # --- 【关键修复3】加载样式表 + 打印背景 ---
    # --stylesheet: 使用 GitHub 样式的 CSS (解决代码块丑、无高亮)
    # --body-class: 激活 markdown-body 样式
    # --pdf-options: printBackground=true (解决代码块背景丢失), margin (页边距)
    set +e 
    cat "$tmp_file" | "$MTP_CMD" \
        --stylesheet "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css" \
        --body-class "markdown-body" \
        --pdf-options '{"format": "A4", "margin": "20mm", "printBackground": true}' \
        --launch-options '{"args": ["--no-sandbox"]}' \
        > "$pdf_path" 2>/dev/null
    exit_code=$?
    set -e 
    rm "$tmp_file"

    if [ $exit_code -eq 0 ] && [ -s "$pdf_path" ]; then
        echo "    [Success] $pdf_path"

        # 插入链接逻辑
        link_md="[本页PDF]($web_pdf_path)"
        if ! grep -Fq "$link_md" "$file"; then
            if grep -q "\[本页PDF\](/pdfs/" "$file"; then
                 sed -i '/\[本页PDF\](\/pdfs\//d' "$file"
                 echo "    [Cleaned] Removed stale PDF links"
            fi
            echo "    [Injecting] PDF link into $file ..."
            if [[ "$(head -n 1 "$file")" == "---" ]]; then
                end_fm_line=$(grep -n "^---$" "$file" | sed -n '2p' | cut -d: -f1)
                if [[ -n "$end_fm_line" ]]; then
                    sed -i "${end_fm_line}a \\
\\
$link_md\\
" "$file"
                else
                    sed -i "1i $link_md\\n" "$file"
                fi
            else
                sed -i "1i $link_md\\n" "$file"
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
        echo "    [Failed] Could not convert $file"
        if [ -f "$pdf_path" ]; then rm "$pdf_path"; fi
        fail_count=$((fail_count + 1))
    fi

done 9< <(find "$INPUT_DIR" -type f -name "*.md" | sort)

jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "---------------------------------------------------"
echo "Run completed!"
echo "Success: $success_count"
echo "Failed:  $fail_count"