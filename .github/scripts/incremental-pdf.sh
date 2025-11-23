#!/bin/bash
set -e # 遇到错误立即停止
set -o pipefail

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
IMAGE_PREFIX="docs/.vuepress/public"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*")

# --- 核心修改区 ---

# 1. 强制本地安装（不保存到 package.json，避免污染）
echo ">>> Force installing markdown-to-pdf locally..."
npm install baileyjm02/markdown-to-pdf --no-save --silent

# 2. 显式指定源码入口文件路径 (cli.js)
# 通常包会安装在 node_modules/markdown-to-pdf 下
JS_ENTRY="./node_modules/markdown-to-pdf/cli.js"

# 3. 双重保险：检查文件到底在不在
if [ ! -f "$JS_ENTRY" ]; then
    echo "!!! Error: Cannot find cli.js at $JS_ENTRY"
    echo ">>> Debugging: Listing node_modules to see what happened:"
    ls -F node_modules/
    if [ -d "node_modules/markdown-to-pdf" ]; then
        echo ">>> Contents of markdown-to-pdf:"
        ls -F node_modules/markdown-to-pdf/
    fi
    exit 1
else
    echo ">>> Found script at: $JS_ENTRY"
fi

# ------------------

command -v jq >/dev/null 2>&1 || echo "Please install jq"

mkdir -p "$MAPPING_DIR"
if [ ! -f "$MAP_FILE" ]; then echo "{}" > "$MAP_FILE"; fi
echo "{}" > "$TEMP_UPDATE_FILE"

total_files=0
total_size=0

# 开始处理文件
while read -r file; do
    if [[ "$(basename "$file")" == "README.md" ]]; then continue; fi
    
    skip=false
    for e in "${EXCLUDE[@]}"; do
        if [[ "$file" == $e ]]; then skip=true; break; fi
    done
    if [ "$skip" = true ]; then continue; fi

    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    if [ "$last_hash" = "$current_hash" ]; then
        echo "Skipping $file (unchanged)"
        continue
    fi

    echo "Processing $file"

    rel_path="${file#$INPUT_DIR/}"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    images=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" | while read -r img; do
        echo "$IMAGE_PREFIX/$img"
    done | jq -R -s -c 'split("\n")[:-1]')

    tmp_file="$(mktemp).md"
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # --- 关键修改：使用 node 直接运行 JS 文件 ---
    # 彻底绕过 npx 和 PATH 问题
    node "$JS_ENTRY" "$tmp_file" \
        --output_dir "$(dirname "$pdf_path")" \
        --build_pdf true \
        --build_html false \
        --launch_options '{"args": ["--no-sandbox"]}'

    gen_tmp_pdf="$(dirname "$pdf_path")/$(basename "$tmp_file" .md).pdf"
    
    if [ -f "$gen_tmp_pdf" ]; then
        mv "$gen_tmp_pdf" "$pdf_path"
    else
        echo "Error: PDF generation failed for $file"
    fi

    rm "$tmp_file"

    if [ -f "$pdf_path" ]; then
        pdf_size=$(stat -c%s "$pdf_path")
    else
        pdf_size=0
    fi
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

done < <(find "$INPUT_DIR" -type f -name "*.md")

jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "PDF generation completed!"
echo "Files generated/updated: $total_files, Total size: $total_size bytes"