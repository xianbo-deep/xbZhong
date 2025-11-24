FROM debian:bullseye-slim

# 设置环境变量，防止中文乱码
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# 1. 安装基础依赖（Chromium + 字体 + Python + Git）
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

# 2. 安装 Pandoc 3.1.13 (.deb 方法)

RUN PANDOC_VERSION="3.1.13" && \
    (apt-get purge -y pandoc pandoc-data || true) && \
    apt-get autoremove -y && \
    # 下载并安装新版本 .deb
    wget https://github.com/jgm/pandoc/releases/download/$PANDOC_VERSION/pandoc-${PANDOC_VERSION}-1-amd64.deb -O pandoc.deb && \
    dpkg -i pandoc.deb && \
    # 验证版本
    pandoc --version && \
    rm pandoc.deb
