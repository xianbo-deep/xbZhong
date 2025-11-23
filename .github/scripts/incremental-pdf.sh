#!/bin/bash
set -e
set -o pipefail

# 1. 强制使用 UTF-8
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# --- 路径定义 ---
CURRENT_DIR=$(pwd)
# 图片根目录
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

# ========================================================
# 【核心修复】生成更稳健的 LaTeX 样式头文件
# ========================================================
STYLE_FILE="typora-style.tex"
cat <<EOF > "$STYLE_FILE"
% 1. 基础包
\usepackage{xcolor}
\usepackage{framed}
\usepackage{fvextra} % 必须要有这个才能换行

% 2. 设置代码块背景色 (浅灰)
\definecolor{codebg}{RGB}{248,248,248}
\definecolor{shadecolor}{named}{codebg}

% 3. 【关键修复】安全地定义 Shaded 环境
% 如果 Pandoc 没有定义 Shaded，我们就自己定义一个简单的
% 如果定义了，我们就用 snugshade 包裹它来实现背景色
\ifdefined\Shaded
  \renewenvironment{Shaded}{\begin{snugshade}}{\end{snugshade}}
\else
  \newenvironment{Shaded}{\begin{snugshade}}{\end{snugshade}}
\fi

% 4. 【关键修复】正确设置代码自动换行
% 不要使用 \DefineVerbatimEnvironment 重写 Highlighting
% 而是直接设置 fvextra 的全局选项
\fvset{
  breaklines=true,
  breakanywhere=true,
  commandchars=\\\\\{\} 
}

% 5. 列表样式优化 (强制使用圆点)
\usepackage{enumitem}
\setlist[itemize,1]{label=\textbullet}
\setlist[itemize,2]{label=\textbullet}
\setlist[itemize,3]{label=\textbullet}

% 6. Typora 风格排版
\usepackage[parfill]{parskip} % 段落间空行，无缩进
\linespread{1.15}

% 7. 链接颜色
\usepackage{hyperref}
\hypersetup{
  colorlinks=true,
  linkcolor=[rgb]{0.0, 0.3, 0.8},
  urlcolor=[rgb]{0.0, 0.3, 0.8}
}

% 8. 常用表格和图形包 (防止报错)
\usepackage{booktabs}
\usepackage{longtable}
\usepackage{array}
\usepackage{multirow}
\usepackage{wrapfig}
\usepackage{float}
\usepackage{colortbl}
\usepackage{pdflscape}
\usepackage{tabu}
\usepackage{threeparttable}
\usepackage{threeparttablex}
\usepackage[normalem]{ulem}
\usepackage{makecell}
EOF

echo ">>> Start scanning (Pandoc + Robust Style)..."
echo ">>> Static Asset Path: $STATIC_BASE_DIR"

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

    # 提取图片列表
    img_list=$(grep -oP '!\[.*?\]\(\K[^\)]+' "$file" || true)
    if [ -z "$img_list" ]; then
        images="[]"
    else
        images=$(echo "$img_list" | while read -r img; do
            echo "$img"
        done | jq -R -s -c 'split("\n")[:-1]')
    fi

    tmp_file="$(mktemp).md"

    # --- 预处理 ---
    # 1. 图片路径修复
    sed -E "s|!\[([^]]*)\]\(/|![\1]($STATIC_BASE_DIR/|g" "$file" > "$tmp_file"

    # 2. 自动包裹公式 (简单的应急修复)
    sed -i 's/^\\begin{aligned}$/$$\n\\begin{aligned}/g' "$tmp_file"
    sed -i 's/^\\end{aligned}$/\\end{aligned}\n$$/g' "$tmp_file"

    # 3. 修复 YAML 冒号问题 (针对 ML.md)
    if [[ "$file" == *"ML.md"* ]]; then
        sed -i 's/icon: carbon:machine-learning/icon: "carbon:machine-learning"/g' "$tmp_file"
    fi

    # ========================================================
    # 【核心转换】
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
        --highlight-style=pygments \
        --resource-path="$STATIC_BASE_DIR" \
        --include-in-header="$STYLE_FILE" \
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
        echo "    ❌ [Failed] Pandoc error on $file"
        fail_count=$((fail_count + 1))
    fi

done 9< <(find "$INPUT_DIR" -type f -name "*.md" | sort)

# 清理样式临时文件
rm "$STYLE_FILE"

jq --arg total_files "$total_files" --arg total_size "$total_size" \
   '.summary = {total_files: ($total_files|tonumber), total_size: ($total_size|tonumber)}' \
   "$TEMP_UPDATE_FILE" > tmp_run.json && mv tmp_run.json "$TEMP_UPDATE_FILE"

echo "---------------------------------------------------"
echo "Run completed!"
echo "Success: $success_count"
echo "Failed:  $fail_count"