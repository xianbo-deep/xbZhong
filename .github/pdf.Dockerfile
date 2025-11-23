FROM debian:bullseye-slim

# 设置环境变量，防止中文乱码
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# 一次性安装所有依赖：Pandoc, Chromium, 中文字体, Python3 (用于后续发邮件脚本)
## 文件名: .github/Dockerfile

# ... (保持 Dockerfile 开头的 FROM debian:bullseye-slim 和 ENV 语句不变) ...

# 1. 安装基础工具 (不含 Pandoc)
RUN apt-get update && apt-get install -y \
    wget \
    chromium \
    fonts-noto-cjk \
    python3 \
    python3-pip \
    jq \
    git \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 2.  升级：手动安装最新版 Pandoc (这里使用 v3.1.13 作为示例，请用你希望的版本)
# 注意：v3.x 版本已支持 --highlight-style=github
RUN wget https://github.com/jgm/pandoc/releases/download/3.1.13/pandoc-3.1.13-1-amd64.deb -O pandoc.deb \
    # 安装 .deb 包，并使用 apt-get install -f 修复依赖
    && dpkg -i pandoc.deb \
    && apt-get install -f -y \
    && rm pandoc.deb



# 这是一个必须的步骤，用于解决 Chromium 在 Docker 中运行的权限问题
# 我们将在调用时使用 --no-sandbox 参数