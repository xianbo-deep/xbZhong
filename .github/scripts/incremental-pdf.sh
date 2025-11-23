#!/bin/bash
set -e
set -o pipefail

# --- 【关键修复】强制使用 UTF-8 编码，解决中文文件名乱码问题 ---
export LC_ALL=C.UTF-8
export LANG=C.UTF-8
# ---------------------------------------------------------

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

# 使用 FD 9 防止循环中断
while IFS= read -r -u9 file; do
    # --- 调试打印：看看到底扫到了什么文件 ---
    # echo "[DEBUG] Found: $file"
    # -------------------------------------

    # 忽略 README
    if [[ "$(basename "$file")" == "README.md" ]]; then continue; fi

    # 排除逻辑
    skip=false
    for e in "${EXCLUDE[@]}"; do
        # 通配符匹配
        if [[ "$file" == $e ]]; then skip=true; break; fi
    done
    if [ "$skip" = true ]; then 
        echo "[Excluded] $file"
        continue
    fi
    
    # 增量检测
    last_hash=$(jq -r --arg key "$file" '.[$key].hash // ""' "$MAP_FILE")
    current_hash=$(sha256sum "$file" | cut -d' ' -f1)

    if [ "$last_hash" = "$current_hash" ]; then
        echo "[Unchanged] $file"
        continue
    fi

    echo ">>> Processing $file ..."

    rel_path="${file#$INPUT_DIR/}"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    images=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" | while read -r img; do
        echo "$IMAGE_PREFIX/$img"
    done | jq -R -s -c 'split("\n")[:-1]')

    tmp_file="$(mktemp).md"
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # --- 容错转换 ---
    set +e 
    cat "$tmp_file" | "$MTP_CMD" --launch-options '{"args": ["--no-sandbox"]}' > "$pdf_path" 2>/dev/null
    exit_code=$?
    set -e 

    if [ $exit_code -eq 0 ] && [ -s "$pdf_path" ]; then
        echo "    ✅ Success: $pdf_path"
        
        pdf_size=$(stat -c%s "$pdf_path")
        gen_time=$(TZ="Asia/Shanghai" date +%Y-%m-%dT%H:%M:%S)

        # 更新 mapping
        jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg hash "$current_hash" \
           --arg size "$pdf_size" --arg gen_time "$gen_time" \
           '.[$key] = {pdf:$pdf, images:$imgs, hash:$hash, size:$size, gen_time:$gen_time}' \
           "$MAP_FILE" > tmp_map.json && mv tmp_map.json "$MAP_FILE"

        # 更新本次运行统计
        jq --arg key "$file" --arg pdf "$pdf_path" --argjson imgs "$images" --arg size "$pdf_size" --arg gen_time "$gen_time" \
           '.[$key] = {pdf:$pdf, images:$imgs, size:$size, gen_time:$gen_time}' \
           "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

        total_files=$((total_files + 1))
        total_size=$((total_size + pdf_size))
        success_count=$((success_count + 1))
    else
        echo "    ❌ Failed: Could not convert $file"
        if [ -f "$pdf_path" ]; then rm "$pdf_path"; fi
        fail_count=$((fail_count + 1))
    fi
    rm "$tmp_file"

done 9< <(find "$INPUT_DIR" -type f -name "*.md")

# 总结
jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "---------------------------------------------------"
echo "Run completed!"
echo "Success: $success_count"
echo "Failed:  $fail_count"