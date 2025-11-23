#!/bin/bash
set -e
set -o pipefail

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
IMAGE_PREFIX="docs/.vuepress/public"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*")

# --- 准备工作 ---
echo ">>> Installing md-to-pdf locally..."
npm install md-to-pdf --no-save --silent

# 定义工具路径
MTP_CMD="./node_modules/.bin/md-to-pdf"

if [ ! -f "$MTP_CMD" ]; then
    echo "!!! CRITICAL: md-to-pdf executable not found at $MTP_CMD"
    ls -l node_modules/.bin/
    exit 1
fi
echo ">>> Tool ready at $MTP_CMD"
# ------------------

command -v jq >/dev/null 2>&1 || echo "Please install jq"

mkdir -p "$MAPPING_DIR"
if [ ! -f "$MAP_FILE" ]; then echo "{}" > "$MAP_FILE"; fi
echo "{}" > "$TEMP_UPDATE_FILE"

total_files=0
total_size=0

# 使用 process substitution 确保循环内的变量修改能带出循环外
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
    # 替换图片路径
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # --- 【关键修改】 ---
    # 使用 > 将屏幕上的 PDF 数据流直接写入目标文件
    "$MTP_CMD" "$tmp_file" --launch-options '{"args": ["--no-sandbox"]}' > "$pdf_path"

    # 检查文件是否真的生成了
    if [ -s "$pdf_path" ]; then
        echo "Success: Generated $pdf_path"
    else
        echo "Error: PDF generation failed for $file (File is empty or missing)"
        rm "$tmp_file"
        # 失败了就跳过，不计入统计
        continue
    fi
    # ------------------

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