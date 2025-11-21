---
title: 关于博客
index: false
icon: grommet-icons:blog
article: false
timeline: false
date: 2025-10-10
---

## 前言
我也是醉了，到大三才想着搭博客，本来学习压力蛮大的，但还是抽个两三天搭一个试试看

我采用的是vuepress框架的theme-hope主题，使用 ~~vercel~~ ~~Netlify~~ Cloudflare进行部署，vercel会有墙的问题，Netlify免费额度太少，且Cloudflare可以用他们的DNS服务器对我的域名进行管理，还有免费的统计功能、CDN、一天100k次请求，香！

博客会存储一些我的个人笔记，放一些随笔啥的，后面也会断断续续更新智*鸡*的课程资料（没空整理aaaaa）

### 优质博客
<SiteInfo
  name="哈基豪的博客"
  desc="本博客之子"
  url="https://junhaowang.cn"
  preview="/jhwangblog.png"
/>

### 自动生成评论通知邮件
Giscus还是有些鸡肋，别人评论的时候自己完全不知道，因此我使用了GithubAction去监听Discussion，当有人评论的时候即可自动发送邮件到我的QQ邮箱

想要实现的话可以去看一下我的[GithubAction](/backend/GitHubActions.md)笔记，了解一下自动化配置文件的基本语法，然后调用[这个Action](https://github.com/dawidd6/action-send-mail)实现邮件的发送


### Algolia重建索引
博客使用了Algolia作为第三方搜索引擎，但是当更新博客之后并不能立刻进行索引重建，需要在Algolia的dashboard进行索引重建，还是比较麻烦的，这里我也是使用GithubAction，采用的是[官方的Action](https://github.com/marketplace/actions/algolia-crawler-automatic-crawl)，但是一直报我的API_KEY有误，等到我解决了再来更新这部分内容吧

**后续解决办法**：换新版本的官方Action即可

### 解决**渲染的问题
\*\* ：\*\*这种情况会导致*内的元素无法被加粗

使用正则表达式
```txt
\*\*([^:]+)：\*\*
```

替换为
```txt
**$1：​​​​**
```

在原生typora不会有这种问题，在VS和vuepress渲染的时候就出现这个问题

需要注意的是，替换的样式加了一个ZWSP字符（零宽空格），具体可以看这篇[博客](https://senjianlu.com/2024/10/06/markdown_cant_blod/)


### 替换标题样式
如果你设置了一级标题，vuepress的title会把你的一级标题**吞**了，然后你在旁边的目录就找不到一级标题:)

上正则表达式

```txt
^(#+)
```

替换为
```txt
#$1
```