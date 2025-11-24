FROM debian:bullseye-slim

# 设置环境变量，防止中文乱码
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# ---------------------------------------------------
# 1. 安装基础依赖（Chromium + 字体 + Python + Git）
# ---------------------------------------------------
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

# ---------------------------------------------------
# 2. 安装 Pandoc 3.1.13
# ---------------------------------------------------
RUN PANDOC_VERSION="3.1.13" && \
    (apt-get remove -y pandoc pandoc-data || true) && \
    apt-get autoremove -y && \
    wget https://github.com/jgm/pandoc/releases/download/$PANDOC_VERSION/pandoc-${PANDOC_VERSION}-1-amd64.deb -O pandoc.deb && \
    dpkg -i pandoc.deb && \
    pandoc --version && \
    rm pandoc.deb

# ---------------------------------------------------
# 3. 下载 GitHub highlight theme（适配 Pandoc 3.x）
# ---------------------------------------------------
RUN mkdir -p /usr/local/share/pandoc && \
    wget https://raw.githubusercontent.com/jgm/pandoc/main/data/themes/github.theme \
        -O /usr/local/share/pandoc/github.theme

# 注意：调用 Pandoc 时这样用 ↓
#   pandoc --highlight-style=/usr/local/share/pandoc/github.theme
#
# ---------------------------------------------------
# 4. 提醒：Chromium 在 Docker 内必须用 --no-sandbox
# ---------------------------------------------------

