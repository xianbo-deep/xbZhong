import json
import os
from datetime import datetime

# 配置路径
JSON_FILE = ".github/mapping/this_run.json"
TEMPLATE_FILE = ".github/template/generate-pdf-template.html" # 假设模板放在根目录
OUTPUT_FILE = "email.html"

def format_size(size_bytes):
    if size_bytes == 0:
        return "0 B"
    size_name = ("B", "KB", "MB", "GB")
    i = int(0)
    p = float(size_bytes)
    while p >= 1024 and i < len(size_name) - 1:
        p /= 1024
        i += 1
    return "{:.2f} {}".format(p, size_name[i])

def generate_email():
    # 1. 读取 JSON 数据
    if not os.path.exists(JSON_FILE):
        print(f"Error: {JSON_FILE} not found.")
        return

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    summary = data.get('summary', {'total_files': 0, 'total_size': 0})
    
    # 2. 生成文件列表 HTML
    file_items_html = ""
    
    # 遍历 data 中的键 (排除 'summary')
    files_data = {k: v for k, v in data.items() if k != 'summary'}
    
    if not files_data:
        file_items_html = '<div style="text-align:center; color:#86868b; padding:20px;">本次运行无文件变动。</div>'
    else:
        for filename, info in files_data.items():
            pdf_path = info.get('pdf', 'Unknown')
            size_bytes = int(info.get('size', 0))
            gen_time = info.get('gen_time', '')
            images = info.get('images', [])
            
            # 格式化图片列表
            img_html = ""
            if images:
                img_span_list = "".join([f'<span class="image-tag">{os.path.basename(img)}</span>' for img in images])
                img_html = f'<div class="image-list">包含图片: {img_span_list}</div>'
            else:
                img_html = '<div class="image-list">无图片引用</div>'

            # 简单的文件名提取 (去除 docs/ 前缀)
            display_name = filename.replace('docs/', '')

            # 构建卡片 HTML
            file_items_html += f"""
            <div class="file-card">
                <span class="file-name">{display_name}</span>
                <div class="file-meta">
                    <span class="meta-item">{format_size(size_bytes)}</span>
                    <span class="meta-item">{gen_time.split('T')[1]}</span>
                </div>
                <div class="file-meta" style="font-size: 11px; word-break: break-all;">
                   生成路径: {pdf_path}
                </div>
                {img_html}
            </div>
            """

    # 3. 读取模板
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        template = f.read()

    # 4. 替换变量
    # 获取当前年份
    current_year = datetime.now().year
    
    # 格式化总大小
    total_size_fmt = format_size(summary['total_size'])
    
    # 获取生成时间 (取第一个文件的生成时间，或者当前时间)
    report_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # 如果有文件，尝试使用 JSON 里的时间
    if files_data:
        first_key = next(iter(files_data))
        report_time = files_data[first_key].get('gen_time', report_time).replace('T', ' ')

    final_html = template.replace('{{total_files}}', str(summary['total_files'])) \
                         .replace('{{total_size_formatted}}', total_size_fmt) \
                         .replace('{{gen_time}}', report_time) \
                         .replace('{{file_list_html}}', file_items_html) \
                         .replace('{{year}}', str(current_year))

    # 5. 输出
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(final_html)
    
    print(f"Successfully generated {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_email()