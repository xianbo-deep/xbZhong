#!/bin/bash
set -euo pipefail
# set -x # 调试时可开启，平时建议注释掉以免日志过多

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
IMAGE_PREFIX="docs/.vuepress/public"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
EXCLUDE=("docs/me/intro.md" "docs/jottings/*" "docs/ZJ/*" "docs/aboutblog/*")

# 增加 --no-sandbox 参数防止 CI 环境报错
INPUT_ARGS="--launch_options '{\"args\": [\"--no-sandbox\"]}'"

command -v markdown-to-pdf >/dev/null 2>&1 || npm install -g baileyjm02/markdown-to-pdf
command -v jq >/dev/null 2>&1 || echo "Please install jq"

export PATH=$PATH:$(npm config get prefix)/bin

# 创建 mapping 目录
mkdir -p "$MAPPING_DIR"

# 初始化 mapping.json
if [ ! -f "$MAP_FILE" ]; then
    echo "{}" > "$MAP_FILE"
fi

# 临时存储本次更新的 PDF 信息
echo "{}" > "$TEMP_UPDATE_FILE"

# 统计信息
total_files=0
total_size=0

# 使用进程替换 < <() 遍历文件
while read -r file; do
    # 判断是否为 README.md
    if [[ "$(basename "$file")" == "README.md" ]]; then
        echo "Skipping $file (README.md)"
        continue
    fi
    # 判断是否在排除列表
    skip=false
    for e in "${EXCLUDE[@]}"; do
        if [[ "$file" == $e ]]; then
            skip=true
            break
        fi
    done
    if [ "$skip" = true ]; then
        echo "Skipping $file (excluded)"
        continue
    fi

    # 判断文件是否被修改
    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    if [ "$last_hash" = "$current_hash" ]; then
        echo "Skipping $file (unchanged)"
        continue
    fi

    echo "Processing $file"

    # 创建PDF输出目录
    rel_path="${file#$INPUT_DIR/}"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    # 将md文件的图片转换成json数组
    # 修正点：移除了正则末尾的 '\)'，防止文件名包含右括号
    images=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" | while read -r img; do
        echo "$IMAGE_PREFIX/$img"
    done | jq -R -s -c 'split("\n")[:-1]')

    # 替换md文件中的图片路径
    tmp_file="$(mktemp).md"
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # 修正点：去掉 npx，直接调用全局安装的 markdown-to-pdf
    markdown-to-pdf "$tmp_file" \
        --output_dir "$(dirname "$pdf_path")" \
        --build_pdf true \
        --build_html false \
        --launch_options '{"args": ["--no-sandbox"]}'

    # 处理生成后的文件名 (工具生成的通常是 临时文件名.pdf)
    gen_tmp_pdf="$(dirname "$pdf_path")/$(basename "$tmp_file" .md).pdf"
    
    if [ -f "$gen_tmp_pdf" ]; then
        mv "$gen_tmp_pdf" "$pdf_path"
    else
        echo "Error: PDF generation failed for $file"
    fi

    rm "$tmp_file"

    # 计算PDF大小和生成时间
    if [ -f "$pdf_path" ]; then
        pdf_size=$(stat -c%s "$pdf_path")
    else
        pdf_size=0
    fi
    gen_time=$(TZ="Asia/Shanghai" date +%Y-%m-%dT%H:%M:%S)

    # 更新 mapping.json
    jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg hash "$current_hash" \
       --arg size "$pdf_size" --arg gen_time "$gen_time" \
       '.[$key] = {pdf:$pdf, images:$imgs, hash:$hash, size:$size, gen_time:$gen_time}' \
       "$MAP_FILE" > tmp_map.json && mv tmp_map.json "$MAP_FILE"

    # 更新本次增量 JSON
    jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg size "$pdf_size" --arg gen_time "$gen_time" \
       '.[$key] = {pdf:$pdf, images:$imgs, size:$size, gen_time:$gen_time}' \
       "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

    # 统计
    total_files=$((total_files + 1))
    total_size=$((total_size + pdf_size))

done < <(find "$INPUT_DIR" -type f -name "*.md")

# 循环结束后，把统计信息写入 this_run.json
jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "PDF generation completed!"
echo "Files generated/updated: $total_files, Total size: $total_size bytes"
echo "This run info saved in $TEMP_UPDATE_FILE"