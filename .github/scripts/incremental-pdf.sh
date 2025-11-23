#!/bin/bash
set -e
set -o pipefail

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
IMAGE_PREFIX="docs/.vuepress/public"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
EXCLUDE=("docs/me/intro.md" "docs/jottings" "docs/ZJ" "docs/aboutblog")

# --- 准备 md-to-pdf ---
echo ">>> Installing md-to-pdf locally..."
npm install md-to-pdf --no-save --silent
MTP_CMD="./node_modules/.bin/md-to-pdf"

if [ ! -f "$MTP_CMD" ]; then
    echo "!!! ERROR: md-to-pdf not found at $MTP_CMD"
    ls -l node_modules/.bin/
    exit 1
fi
echo ">>> md-to-pdf ready"

command -v jq >/dev/null 2>&1 || { echo "Please install jq"; exit 1; }

mkdir -p "$MAPPING_DIR"
[ ! -f "$MAP_FILE" ] && echo "{}" > "$MAP_FILE"
echo "{}" > "$TEMP_UPDATE_FILE"

total_files=0
total_size=0

# 查找所有 Markdown 文件
while read -r file; do
    base_file="$(basename "$file")"
    # 排除 README.md
    [ "$base_file" == "README.md" ] && continue

    # 排除指定目录或文件
    skip=false
    for e in "${EXCLUDE[@]}"; do
        if [[ "$file" == $e || "$file" == $e/* ]]; then
            skip=true
            break
        fi
    done
    [ "$skip" = true ] && continue

    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    if [ "$last_hash" = "$current_hash" ]; then
        echo ">>> Skipping unchanged file: $file"
        continue
    fi

    echo ">>> Processing $file"
    rel_path="${file#$INPUT_DIR/}"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    # 处理图片路径
    images=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" | while read -r img; do
        echo "$IMAGE_PREFIX/$img"
    done | jq -R -s -c 'split("\n")[:-1]')

    tmp_file="$(mktemp).md"
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # --- 正确生成 PDF ---
    "$MTP_CMD" "$tmp_file" --dest "$pdf_path" --launch-options '{"args": ["--no-sandbox"]}'

    if [ -s "$pdf_path" ]; then
        echo ">>> Success: $pdf_path generated"
    else
        echo "!!! ERROR: PDF generation failed for $file"
        rm "$tmp_file"
        continue
    fi

    rm "$tmp_file"

    pdf_size=$(stat -c%s "$pdf_path")
    gen_time=$(TZ="Asia/Shanghai" date +%Y-%m-%dT%H:%M:%S)

    # 更新 mapping.json
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

echo ">>> PDF generation completed! Files generated/updated: $total_files, Total size: $total_size bytes"
