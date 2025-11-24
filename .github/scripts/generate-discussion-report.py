import os
import requests
import re
from datetime import datetime, timedelta, timezone

# --- 配置 ---
GITHUB_TOKEN = os.environ.get("GH_TOKEN")
REPO_OWNER = os.environ.get("REPO_OWNER")
REPO_NAME = os.environ.get("REPO_NAME")

# 定义北京时区 (UTC+8)
BEIJING_TZ = timezone(timedelta(hours=8))

# --- GraphQL 查询 ---
QUERY = """
query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    discussions(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        title
        url
        comments(last: 50) {
          nodes {
            author { login avatarUrl }
            body
            createdAt
            url
            replies(last: 20) {
              nodes {
                author { login avatarUrl }
                body
                createdAt
                url
              }
            }
          }
        }
      }
    }
  }
}
"""

def fetch_discussions():
    headers = {"Authorization": f"Bearer {GITHUB_TOKEN}"}
    response = requests.post(
        "https://api.github.com/graphql",
        json={"query": QUERY, "variables": {"owner": REPO_OWNER, "name": REPO_NAME}},
        headers=headers
    )
    if response.status_code != 200:
        raise Exception(f"Query failed: {response.status_code}")
    return response.json()

def parse_time(iso_str):
    # GitHub 返回的是 UTC 时间 (例如 2023-11-20T10:00:00Z)
    dt_utc = datetime.fromisoformat(iso_str.replace('Z', '+00:00'))
    # 转换为北京时间
    return dt_utc.astimezone(BEIJING_TZ)

def process_data(data, start_date, end_date):
    new_comments = []
    new_replies = []

    discussions = data['data']['repository']['discussions']['nodes']
    
    for disc in discussions:
        disc_title = disc['title']
        
        # 遍历评论
        for comment in disc['comments']['nodes']:
            c_time = parse_time(comment['createdAt'])
            
            # 判断评论是否在本周 (此时 c_time 和 start_date 都是北京时间)
            if start_date <= c_time <= end_date:
                new_comments.append({
                    "AUTHOR_NAME": comment['author']['login'] if comment['author'] else "Unknown",
                    "AUTHOR_AVATAR": comment['author']['avatarUrl'] if comment['author'] else "https://github.com/identicons/app.png",
                    "TIMESTAMP": c_time.strftime("%m-%d %H:%M"),
                    "COMMENT_BODY": comment['body'][:200].replace("\n", "<br>") + "..." if len(comment['body']) > 200 else comment['body'].replace("\n", "<br>"),
                    "DISCUSSION_TITLE": disc_title,
                    "DISCUSSION_LINK": comment['url']
                })

            # 遍历回复
            for reply in comment['replies']['nodes']:
                r_time = parse_time(reply['createdAt'])
                if start_date <= r_time <= end_date:
                    new_replies.append({
                        "REPLY_AUTHOR_NAME": reply['author']['login'] if reply['author'] else "Unknown",
                        "REPLY_AUTHOR_AVATAR": reply['author']['avatarUrl'] if reply['author'] else "https://github.com/identicons/app.png",
                        "REPLY_TIMESTAMP": r_time.strftime("%m-%d %H:%M"),
                        "REPLY_BODY": reply['body'][:200].replace("\n", "<br>") + "..." if len(reply['body']) > 200 else reply['body'].replace("\n", "<br>"),
                        "DISCUSSION_TITLE": disc_title,
                        "REPLY_LINK": reply['url']
                    })
                    
    return new_comments, new_replies

def fill_template_loop(template_content, marker_start, marker_end, data_list):
    pattern = re.compile(f"{marker_start}(.*?){marker_end}", re.DOTALL)
    match = pattern.search(template_content)
    if not match: return template_content

    loop_template = match.group(1)
    result_html = ""
    for item in data_list:
        item_html = loop_template
        for key, value in item.items():
            item_html = item_html.replace(f"{{{{{key}}}}}", str(value))
        result_html += item_html
    return template_content.replace(match.group(0), result_html)

def main():
    # 1. 确定时间范围 (使用北京时间)
    now = datetime.now(BEIJING_TZ)
    end_date = now
    start_date = now - timedelta(days=7)
    
    print(f"Searching from {start_date} to {end_date} (Beijing Time)")

    # 2. 获取数据
    raw_data = fetch_discussions()
    comments, replies = process_data(raw_data, start_date, end_date)
    
    print(f"Found {len(comments)} comments and {len(replies)} replies.")

    # 如果没有数据，我们可以选择不生成文件，或者生成一个空提示文件
    # 这里为了防止 Action 报错，即使没有数据也生成，内容可以是一句话提示
    if not comments and not replies:
        print("本周无新动态。")
        # 也可以选择 exit(0) 让后续步骤通过 if 判断跳过发送，
        # 但为了简单，这里还是生成报告，只是内容为空
    
    # 3. 读取 HTML 模板
    with open("./discussion-report-template.html", "r", encoding="utf-8") as f:
        html = f.read()

    # 4. 替换基础信息
    html = html.replace("{{DATE_START}}", start_date.strftime("%Y-%m-%d"))
    html = html.replace("{{DATE_END}}", end_date.strftime("%Y-%m-%d"))
    html = html.replace("{{YEAR}}", str(now.year))

    # 5. 替换循环列表
    html = fill_template_loop(html, "<!-- {{COMMENT_LOOP_START}} -->", "<!-- {{COMMENT_LOOP_END}} -->", comments)
    html = fill_template_loop(html, "<!-- {{REPLY_LOOP_START}} -->", "<!-- {{REPLY_LOOP_END}} -->", replies)

    # 6. 保存为 email.html (供下一步 Action 读取)
    with open("email.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("报告已生成: email.html")

if __name__ == "__main__":
    main()