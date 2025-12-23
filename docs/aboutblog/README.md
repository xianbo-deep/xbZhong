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

<SiteInfo
  name="宋文韬的博客"
  url="https://wentao2297.github.io"
  preview="/wentaoblog.png"
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

### 评论区周报
使用GithubAction每周执行一次，会统计7天内的评论和回复并发送邮件，如果有需要代码的可以到我的Github仓库获取源码


### 为每篇文章自动生成PDF
使用GithubAction为每篇文章自动生成PDF，经过一天多的调试，我总结出以下的坑，希望能帮助到想实现这个功能的你们

::: tabs
@tab:active 工具的选取
我个人极力推荐Typora的PDF导出，它导出来的PDF非常好看，可惜它的渲染引擎不是开源的，并且在没有GUI页面的服务器无法进行导出

- 首先CI方面选择了GithuAction，开源免费
- 其次是PDF的生成
  - 我刚开始使用了md2pdf这个工具包，它使用的是Chrome的无头浏览器去渲染，具体用的什么css我是不知道的，生成的PDF效果特别差，并且公式也没法渲染
  - 后来用了Pandoc + Latex 直接生成PDF，比较恶心的是Latex对数学公式的语法要求特别严格，我调整了大半天才把所有文章的公式调对，虽然公式渲染的不错，但是代码块渲染的有问题，远远不及Typora导出的样式，并且使用Pandoc需要上百个外部包，光是下载环境和依赖就到达了两分钟，无法忍受
  - 我询问了GPT，他给我提供的思路是Chromium + Mathjax + Typora内置的css样式，导出来的效果确实不错，后面只需要微调下代码块的css就可以还原Typora百分之80的样式
  - 比较麻烦的是如果没有缓存，每次执行任务都要重新下载Chromium，还是比较浪费时间，因此我采用了Docker，利用Docker镜像快速构建虚拟容器，同时在远程仓库进行镜像缓存，现在进行全量生成大概在2min左右，效果也非常不错


@tab 初步构思
核心思想大概是这样的：
- 维护一个`mapping.json`，记录每个文章用到了什么图片，大小是多少，路径在哪里，生成的PDF路径在哪里，以及每个文章的哈希值，记录哈希值可以帮助我们判断文章是否被更改过，从而决定是否要重新生成PDF
- 写一个Bash脚本，定义处理逻辑，构建所需的包、环境，并将处理完的所有信息放置在`this_run.json`文件中，用来给py脚本做HTML模板的填充，同时还会给对应的md文件添加PDF路径，用户可以进行PDF的下载
- 最后要进行git的提交和推送，注意这里提交不要用`git add .`，不然你可能会把下载的环境也提交上去

@tab 整体流程
- 构建环境，下载镜像并启动容器
- 跑Bash脚本，生成PDF并放置在对应路径，生成`this_run.json`文件
- py脚本处理`this_run.json`文件，填充HTML模板
- 进行Git的提交和推送，cloudflare重新部署
- 发送邮件通知

@tab 补充
我发现代码块的样式实在太烂了，去网上查了查才发现是要用到highlight.js进行代码块高亮处理，然后我又加了一个显示行号的插件，让Gemini改了下脚本和css样式，现在才勉强能看。js脚本去我的[资料库](/resource/tools.md)进行查看即可。

不过还有一点就是Pandoc对md文件的格式极为严苛，如果不按它的标准来，是无法渲染样式的，但我也没什么办法，毕竟Typora在这块是闭源的。

@tab 心得体会
浪费了我一天多的时间，最后总算是结束了，只可惜最后效果还是略逊于Typora导出的PDF样式，不过也算还行

如果你们有什么问题可以在评论区进行评论，我这边是可以看到评论的，并且会及时回复


:::


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