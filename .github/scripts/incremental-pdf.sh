#!/bin/bash
set -e # 任何命令失败就退出
set -o pipefail # 管道命令中任何一个失败就退出

# 1. 强制使用 UTF-8 (解决中文文件名乱码)
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

INPUT_DIR="docs"
OUTPUT_DIR="docs/.vuepress/public/pdfs"
IMAGE_PREFIX="docs/.vuepress/public"
MAPPING_DIR=".github/mapping"
MAP_FILE="$MAPPING_DIR/mapping.json"
TEMP_UPDATE_FILE="$MAPPING_DIR/this_run.json"
# 不生成PDF的目录和文件
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

# 使用 FD 9 防止循环被 stdin 干扰，并加上 sort 确保顺序
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
    # VuePress 相对路径
    web_pdf_path="/pdfs/${rel_path%.md}.pdf"
    pdf_path="$OUTPUT_DIR/${rel_path%.md}.pdf"
    mkdir -p "$(dirname "$pdf_path")"

    # 使用 || true 防止 grep 找不到图片时返回 1 导致脚本崩溃
    img_list=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" || true)

    if [ -z "$img_list" ]; then
        images="[]"
    else
        images=$(echo "$img_list" | while read -r img; do
            echo "$IMAGE_PREFIX/$img"
        done | jq -R -s -c 'split("\n")[:-1]')
    fi
    # -------------------------------

    tmp_file="$(mktemp).md"
    sed -E "s|!\[([^\]]*)\]\(/|![\1]($IMAGE_PREFIX/|g" "$file" > "$tmp_file"

    # --- 容错转换 ---
    set +e 
    cat "$tmp_file" | "$MTP_CMD" --launch-options '{"args": ["--no-sandbox"]}' > "$pdf_path" 2>/dev/null
    exit_code=$?
    set -e 
    rm "$tmp_file"

    if [ $exit_code -eq 0 ] && [ -s "$pdf_path" ]; then
        echo "    [Success] $pdf_path"

        # ========================================================
        # 【新增功能】清理旧链接并插入新链接
        # ========================================================
        
        # 定义要插入的文本 (无 Icon)
        link_md="[本页PDF]($web_pdf_path)"
        
        # 1. 检查文件中是否已有【完全匹配】的正确链接
        # 如果没有正确链接，说明要么是没插过，要么是插了旧的/错的
        if ! grep -Fq "$link_md" "$file"; then
            
            # 2. 如果存在【格式相似】但【路径不对】的旧链接，先删掉
            # 匹配包含 "[本页PDF](/pdfs/" 的行
            if grep -q "\[本页PDF\](/pdfs/" "$file"; then
                 sed -i '/\[本页PDF\](\/pdfs\//d' "$file"
                 echo "    [Cleaned] Removed stale PDF links"
            fi

            echo "    [Injecting] PDF link into $file ..."
            
            # 3. 插入新链接
            # 检测是否以 YAML Front Matter (---) 开头
            if [[ "$(head -n 1 "$file")" == "---" ]]; then
                # 找到第2个 '---' 的行号
                end_fm_line=$(grep -n "^---$" "$file" | sed -n '2p' | cut -d: -f1)
                
                if [[ -n "$end_fm_line" ]]; then
                    # 在 Front Matter 结束行的下一行插入链接，并加空行
                    sed -i "${end_fm_line}a \\
\\
$link_md\\
" "$file"
                else
                    # 没找到结尾的 ---，直接插在第一行
                    sed -i "1i $link_md\\n" "$file"
                fi
            else
                # 没有 Front Matter，直接插在第一行
                sed -i "1i $link_md\\n" "$file"
            fi
            
            # !!! 重新计算 Hash !!!
            # 因为修改了文件，必须更新 Hash，否则下次运行会死循环
            current_hash=$(sha256sum "$file" | cut -d' ' -f1)
        fi
        # ========================================================
        
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

# 加上 sort 保证顺序
done 9< <(find "$INPUT_DIR" -type f -name "*.md" | sort)

jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "---------------------------------------------------"
echo "Run completed!"
echo "Success: $success_count"
echo "Failed:  $fail_count"