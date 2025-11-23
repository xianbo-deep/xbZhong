FROM debian:bullseye-slim

# 设置环境变量，防止中文乱码
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# 一次性安装所有依赖：Pandoc, Chromium, 中文字体, Python3 (用于后续发邮件脚本)
# 使用清华源或者默认源均可，这里使用默认源
RUN apt-get update && apt-get install -y \
    pandoc \
    chromium \
    fonts-noto-cjk \
    python3 \
    python3-pip \
    jq \
    git \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 这是一个必须的步骤，用于解决 Chromium 在 Docker 中运行的权限问题
# 我们将在调用时使用 --no-sandbox 参数