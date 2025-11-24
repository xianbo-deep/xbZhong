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

RUN PANDOC_VERSION="3.1.13" && \
    # 1. 尝试卸载旧版 (加上 || true 防止因未安装而报错停止)
    (apt-get remove -y pandoc pandoc-data || true) && \
    apt-get autoremove -y && \
    # 2. 下载并安装新版
    wget https://github.com/jgm/pandoc/releases/download/$PANDOC_VERSION/pandoc-${PANDOC_VERSION}-1-amd64.deb -O pandoc.deb && \
    dpkg -i pandoc.deb && \
    # 3. 验证版本
    pandoc --version && \
    rm pandoc.deb



# 这是一个必须的步骤，用于解决 Chromium 在 Docker 中运行的权限问题
# 我们将在调用时使用 --no-sandbox 参数