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

遇到的问题：
- 需要调用Github的API获取评论类型为回复的父评论（楼主），Github提供了RestAPI和GraphQL，我使用的是GraphQL，但是查询时如果传递的是当前评论的父评论ID，会报错
  - 因为他需要的父评论ID需要经过Base64编码，而我们从event获取的是数值类型的ID，因此我们拿当前评论的ID（经过了Base64编码）去查询它的replyTo字段即可获得父评论的信息
- 邮件发送HTML后邮箱无法渲染
  - 用模板文件，然后使用sed对占位符进行替换，最后使用`html_body`指定HTML文件
- 如果没有传递`GITHUB_TOKEN`，请求会受到限制，降至50次/小时
  - GithubAction每次执行workflow会自动在环境变量中创建TOKEN，我们直接使用`secrets.GITHUB_TOKEN`即可获取


### Algolia重建索引
博客使用了Algolia作为第三方搜索引擎，但是当更新博客之后并不能立刻进行索引重建，需要在Algolia的dashboard进行索引重建，还是比较麻烦的，这里我也是使用GithubAction，采用的是[官方的Action](https://github.com/marketplace/actions/algolia-crawler-automatic-crawl)，但是一直报我的API_KEY有误，等到我解决了再来更新这部分内容吧

**后续解决办法**：换新版本的官方Action即可


### 死链检测
目前用了GithubAction每日对我博客的所有markdown文件进行自动扫描，检查是否有死链(也就是无效的URL)产生

遇到的几个问题：
- 在vuepress中，标题的ID会被渲染成小写(Java被渲染成java)，导致在某个地方对Java这个标题产生引用的时候会找不到，从而产生锚点(md文件内标题的跳转)死链
  - 把**引用的Java改成java**即可
- 死链检测的时候使用外部工具：markdown-link-check，正常读取他的标准输出永远也检测不到死链
  - 需要把他的标准输出和标准错误读取到一个文件中，再使用grep对错误信息进行提取，最后嵌入HTML模板文件发送邮件
- 检测的时候会遇到路径问题，因为vuepress的静态文件使用的是相对路径，会导致外部工具无法找到静态文件
  - 创建一个`.markdown-link-check.json`文件，用来规定如何替换相对路径为绝对路径，同时使用__WORK_DIR__占位，**在自动化脚本执行的时候获取工作目录，对占位符进行替换，把相对路径改成`file://`形式的绝对路径即可**
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