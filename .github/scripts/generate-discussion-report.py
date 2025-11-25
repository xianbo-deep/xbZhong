import os
import requests
import re
from datetime import datetime, timedelta, timezone

# --- 配置 ---
GITHUB_TOKEN = os.environ.get("GH_TOKEN")
REPO_OWNER = os.environ.get("REPO_OWNER")
REPO_NAME = os.environ.get("REPO_NAME")
# 注意：确保 BASE_URL 格式正确，根据你的习惯这里保留你原本的写法，但建议检查是否少了个冒号
BASE_URL = 'https://xbzhong.cn/' 

# 定义北京时区 (UTC+8)
BEIJING_TZ = timezone(timedelta(hours=8))

# --- Emoji 映射表 ---
EMOJI_MAP = {
    "THUMBS_UP": "👍",
    "THUMBS_DOWN": "👎",
    "LAUGH": "😄",
    "HOORAY": "🎉",
    "CONFUSED": "😕",
    "HEART": "❤️",
    "ROCKET": "🚀",
    "EYES": "👀"
}

# --- GraphQL 查询 (新增 reactions 字段) ---
QUERY = """
query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    discussions(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        title
        url
        createdAt
        reactions(last: 20) {
          nodes {
            content
            user { login avatarUrl }
            createdAt
          }
        }
        comments(last: 50) {
          nodes {
            author { login avatarUrl }
            body
            createdAt
            url
            reactions(last: 20) {
              nodes {
                content
                user { login avatarUrl }
                createdAt
              }
            }
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
    # GitHub 返回的是 UTC 时间
    dt_utc = datetime.fromisoformat(iso_str.replace('Z', '+00:00'))
    return dt_utc.astimezone(BEIJING_TZ)

def process_data(data, start_date, end_date):
    new_comments = []
    new_replies = []
    new_reactions = []
    
    discussions = data['data']['repository']['discussions']['nodes']
    
    for disc in discussions:
        # 构建文章链接 (根据你的要求：BASE_URL + Title)
        article_link = BASE_URL + disc['title']
        article_title = BASE_URL + disc['title']
        
        # 1. 不再统计新讨论 (stat_new_discussions 已移除)

        # 2. 处理针对“文章”的回应 (Reactions on Discussion)
        for react in disc['reactions']['nodes']:
            r_time = parse_time(react['createdAt'])
            if start_date <= r_time <= end_date:
                new_reactions.append({
                    "REACTOR_NAME": react['user']['login'] if react['user'] else "Ghost",
                    "REACTOR_AVATAR": react['user']['avatarUrl'] if react['user'] else "https://github.com/identicons/app.png",
                    "REACTION_TIMESTAMP": r_time.strftime("%m-%d"),
                    "REACTION_EMOJI": EMOJI_MAP.get(react['content'], "👍"),
                    "TARGET_TYPE_LABEL": "文章",
                    "TARGET_TITLE": article_title, # 显示标题
                    "TARGET_LINK": article_link    # 跳转链接
                })

        # 3. 遍历评论
        for comment in disc['comments']['nodes']:
            c_time = parse_time(comment['createdAt'])
            
            # 提取作者信息
            c_author_name = comment['author']['login'] if comment['author'] else "Unknown"
            c_author_avatar = comment['author']['avatarUrl'] if comment['author'] else "https://github.com/identicons/app.png"

            # 处理新评论
            if start_date <= c_time <= end_date:
                new_comments.append({
                    "AUTHOR_NAME": c_author_name,
                    "AUTHOR_AVATAR": c_author_avatar,
                    "TIMESTAMP": c_time.strftime("%m-%d %H:%M"),
                    "COMMENT_BODY": comment['body'][:200].replace("\n", "<br>") + "..." if len(comment['body']) > 200 else comment['body'].replace("\n", "<br>"),
                    "DISCUSSION_TITLE": article_title,
                    "DISCUSSION_LINK": article_link,
                    # 预留空数据防止报错，评论不需要点赞详情
                    "REACTION_THUMBS_UP": "", 
                    "REACTION_HEART": ""
                })

            # 处理针对“评论”的回应 (Reactions on Comment)
            for react in comment['reactions']['nodes']:
                r_time = parse_time(react['createdAt'])
                if start_date <= r_time <= end_date:
                    new_reactions.append({
                        "REACTOR_NAME": react['user']['login'] if react['user'] else "Ghost",
                        "REACTOR_AVATAR": react['user']['avatarUrl'] if react['user'] else "https://github.com/identicons/app.png",
                        "REACTION_TIMESTAMP": r_time.strftime("%m-%d"),
                        "REACTION_EMOJI": EMOJI_MAP.get(react['content'], "❤️"),
                        "TARGET_TYPE_LABEL": "评论",
                        "TARGET_TITLE": article_title, 
                        "TARGET_LINK": article_link
                    })

            # 4. 遍历回复
            for reply in comment['replies']['nodes']:
                r_time = parse_time(reply['createdAt'])
                if start_date <= r_time <= end_date:
                    # 父评论预览：【修改处】不再截取前50字，也不加 "..."
                    # 将换行符替换为空格，保持引用整洁
                    parent_snippet = comment['body'].replace("\n", " ")
                    
                    new_replies.append({
                        "REPLY_AUTHOR_NAME": reply['author']['login'] if reply['author'] else "Unknown",
                        "REPLY_AUTHOR_AVATAR": reply['author']['avatarUrl'] if reply['author'] else "https://github.com/identicons/app.png",
                        "REPLY_TIMESTAMP": r_time.strftime("%m-%d %H:%M"),
                        "REPLY_BODY": reply['body'][:200].replace("\n", "<br>") + "..." if len(reply['body']) > 200 else reply['body'].replace("\n", "<br>"),
                        "DISCUSSION_TITLE": article_title,
                        "REPLY_LINK": article_link,
                        "PARENT_AUTHOR_NAME": c_author_name,
                        "PARENT_AUTHOR_AVATAR": c_author_avatar,
                        "PARENT_COMMENT_SNIPPET": parent_snippet
                    })
                    
    # 汇总统计数据
    stats = {
        "NEW_COMMENT_COUNT": len(new_comments),
        "NEW_REPLY_COUNT": len(new_replies),
        "NEW_REACTION_COUNT": len(new_reactions)
    }

    return new_comments, new_replies, new_reactions, stats

def fill_template_loop(template_content, marker_start, marker_end, data_list):
    pattern = re.compile(f"{marker_start}(.*?){marker_end}", re.DOTALL)
    match = pattern.search(template_content)
    if not match: return template_content

    loop_template = match.group(1)
    result_html = ""
    
    # 如果数据列表为空，可以直接清空占位符，或者显示“无”
    if not data_list:
        return template_content.replace(match.group(0), "")

    for item in data_list:
        item_html = loop_template
        for key, value in item.items():
            # 简单的字符串替换
            item_html = item_html.replace(f"{{{{{key}}}}}", str(value))
        result_html += item_html
    return template_content.replace(match.group(0), result_html)

def main():
    # 1. 确定时间范围
    now = datetime.now(BEIJING_TZ)
    end_date = now
    start_date = now - timedelta(days=7)
    
    print(f"Searching from {start_date} to {end_date} (Beijing Time)")

    # 2. 获取数据
    try:
        raw_data = fetch_discussions()
        comments, replies, reactions, stats = process_data(raw_data, start_date, end_date)
        print(f"Stats: {stats}")
    except Exception as e:
        print(f"Error fetching data: {e}")
        return

    # 3. 读取 HTML 模板
    template_path = "./discussion-report-template.html" 
    try:
        with open(template_path, "r", encoding="utf-8") as f:
            html = f.read()
    except FileNotFoundError:
        print(f"Error: 找不到模板文件 '{template_path}'")
        return
        
    # 4. 替换全局统计变量
    html = html.replace("{{DATE_START}}", start_date.strftime("%Y-%m-%d"))
    html = html.replace("{{DATE_END}}", end_date.strftime("%Y-%m-%d"))
    html = html.replace("{{YEAR}}", str(now.year))
    
    # 替换统计看板数据
    for key, val in stats.items():
        html = html.replace(f"{{{{{key}}}}}", str(val))

    # 5. 替换循环列表 (评论、回复、回应)
    html = fill_template_loop(html, "<!-- {{COMMENT_LOOP_START}} -->", "<!-- {{COMMENT_LOOP_END}} -->", comments)
    html = fill_template_loop(html, "<!-- {{REPLY_LOOP_START}} -->", "<!-- {{REPLY_LOOP_END}} -->", replies)
    html = fill_template_loop(html, "<!-- {{REACTION_LOOP_START}} -->", "<!-- {{REACTION_LOOP_END}} -->", reactions)

    # 6. 保存生成的文件
    with open("email.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("报告已生成: email.html")

if __name__ == "__main__":
    main()