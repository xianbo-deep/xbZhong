#!/bin/bash
set -e
set -o pipefail

# 1. 强制使用 UTF-8
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# --- 路径定义 ---
CURRENT_DIR=$(pwd)
# 图片根目录 (VuePress public 目录的绝对路径)
STATIC_BASE_DIR="$CURRENT_DIR/docs/.vuepress/public"

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"

EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*")

# --- 检查工具 ---
if ! command -v pandoc &> /dev/null; then
    echo "!!! CRITICAL: pandoc not found."
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

echo ">>> Start scanning (Pandoc Mode)..."
echo ">>> Static assets base directory: $STATIC_BASE_DIR"

# 遍历文件
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

    # 提取图片用于统计
    img_list=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" || true)
    if [ -z "$img_list" ]; then
        images="[]"
    else
        images=$(echo "$img_list" | while read -r img; do
            echo "$img"
        done | jq -R -s -c 'split("\n")[:-1]')
    fi

    tmp_file="$(mktemp).md"
    
    # ========================================================
    # 【预处理步骤】
    # ========================================================
    
    # 1. 【图片路径修复】
    # 将 ![](/screenshot/...) 替换为 ![](/home/runner/.../public/screenshot/...)
    # 使用 | 作为分隔符，防止路径中的 / 冲突
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($STATIC_BASE_DIR/|g" "$file" > "$tmp_file"

    # 2. 【公式自动修复 (尝试)】
    # 如果文件里有 \begin{aligned} 但没包 $$，尝试自动加上
    # 注意：这只是简单的应急修复，最好还是手动改源文件
    sed -i 's/^\\begin{aligned}$/$$\n\\begin{aligned}/g' "$tmp_file"
    sed -i 's/^\\end{aligned}$/\\end{aligned}\n$$/g' "$tmp_file"
    
    # 3. 【清理 LaTeX 毒药】
    # 有些文件可能有 \#\#\# 这种写法导致 LaTeX 报错，尝试清理
    # sed -i 's/\\#/#/g' "$tmp_file" 

    # ========================================================
    # 【核心转换：Pandoc + XeLaTeX】
    # ========================================================
    set +e
    pandoc "$tmp_file" \
        -o "$pdf_path" \
        --pdf-engine=xelatex \
        -V mainfont="Noto Sans CJK SC" \
        -V CJKmainfont="Noto Sans CJK SC" \
        -V sansfont="Noto Sans CJK SC" \
        -V monofont="Noto Sans Mono CJK SC" \
        -V geometry:margin=2cm \
        -V colorlinks=true \
        -V linkcolor=blue \
        -V urlcolor=blue \
        --highlight-style=tango \
        --resource-path="$STATIC_BASE_DIR" \
        --include-in-header=<(echo '\usepackage{pmboxdraw}') \
        --toc \
        --toc-depth=2
    
    exit_code=$?
    set -e
    rm "$tmp_file"

    if [ $exit_code -eq 0 ] && [ -s "$pdf_path" ]; then
        echo "    ✅ [Success] $pdf_path"

        # --- 注入下载链接 ---
        link_md="[本页PDF]($web_pdf_path)"
        if ! grep -Fq "$link_md" "$file"; then
            if grep -q "\[本页PDF\](/pdfs/" "$file"; then
                 sed -i '/\[本页PDF\](\/pdfs\//d' "$file"
                 echo "    [Cleaned] Old links"
            fi
            echo "    [Injecting] Link..."
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
        # 失败时输出最后几行错误日志供调试，但不退出
        echo "    ❌ [Failed] Pandoc error on $file"
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