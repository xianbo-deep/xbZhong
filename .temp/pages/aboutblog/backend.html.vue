<template><div><p>关于这个博客，我感觉自己如果没有开发些后端是没有灵魂的，虽然市面上有很多优秀的统计工具，但我还是想锻炼下自己。首先就是捣鼓一下这个统计的功能，至少能让我知道每个页面访问的次数，IP来源等，其次就是弄一下这个前端的小组件，可以返回当天访问量靠前的文章，再后面可能考虑搭一个后台管理的可视化统计。</p>
<h2 id="技术栈选取" tabindex="-1"><a class="header-anchor" href="#技术栈选取"><span>技术栈选取</span></a></h2>
<p>考虑到目前只有统计的需求，选择用Go来开发这个功能。首先就是扩展方便，其次就是生态蛮丰富，框架也多，市面上免费的框架也原生支持Go，还有就是我最近刚学完Go，想借此巩固下。</p>
<p>后端目前打算用腾讯云的VPS搭建，2GB的RAM和2核CPU，一年99，就是不知道会不会涨价，先用着吧</p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3>
<p>由于内存只有可怜的2GB，我只能在这里面塞Redis、Nginx再跑一个go，还有个比较ex的事情是ip绑域名还要备案。。。。</p>
<p>Redis是不对外暴露的，用Nginx作反代。</p>
<p>因为目前数据量预估不是特别大，所以Redis内存上限我设置了256MB，内存淘汰策略对所有key用了LRU</p>
<p>文件目录：<code v-pre>www/server/redis/redis.conf</code></p>
<div class="language-conf line-numbers-mode" data-highlighter="shiki" data-ext="conf" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-conf"><span class="line"><span>maxmemory 256mb</span></span>
<span class="line"><span>protected-mode yes</span></span>
<span class="line"><span>bind 127.0.0.1</span></span>
<span class="line"><span>maxmemory-policy allkeys-lru</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="访客位置的获取" tabindex="-1"><a class="header-anchor" href="#访客位置的获取"><span>访客位置的获取</span></a></h3>
</div></template>


