<template><div><p><a href="/pdfs/backend/Nginx.pdf">本页PDF</a></p>
<p><a href="https://nginx.org/en/docs/" target="_blank" rel="noopener noreferrer">官方文档</a><br>
<a href="https://docs.nginx.com/nginx/admin-guide/" target="_blank" rel="noopener noreferrer">高阶指南</a></p>
<h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>Nginx</span></a></h2>
<p>一个高性能的开源web服务器，可以用作<strong>反向代理、负载均衡、Http缓存</strong></p>
<h3 id="简单控制命令" tabindex="-1"><a class="header-anchor" href="#简单控制命令"><span>简单控制命令</span></a></h3>
<p><strong>通过控制<code v-pre>nginx.exe</code>文件来启动<code v-pre>nginx</code></strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> signal</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>其中<code v-pre>signal</code>为：</p>
<ul>
<li><code v-pre>stop</code>：快速关机</li>
<li><code v-pre>quit</code>：优雅关机</li>
<li><code v-pre>reload</code>：重新加载配置文件</li>
<li><code v-pre>reopen</code>：重新打开日志文件</li>
</ul>
<p><strong>查看<code v-pre>nginx</code>版本号</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -v</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>获取所有正在运行<code v-pre>nginx</code>进程的列表</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">ps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> aux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">grep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> nginx</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>检查配置文件语法</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">nginx</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -t</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h3>
<p><strong>核心配置块</strong></p>
<ul>
<li><strong>全局块：设置<code v-pre>Nginx</code>整体运行的配置指令</strong>
<ul>
<li><code v-pre>user</code>：设定用户组</li>
<li><code v-pre>worker_processes</code>：设定处理请求的进程数量</li>
<li><code v-pre>error_log</code>：错误日志存放路径，后面跟日志级别</li>
<li><code v-pre>access_log</code>：访问日志存放路径</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">user </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">www-data www-data;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">worker_processes </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">auto;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">worker_rlimit_nofile </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">65535</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">pid </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/run/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">error_log </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/var/log/nginx/error.log </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">warn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>events</code>：调整<code v-pre>Nginx</code>如何进行网络连接</strong>
<ul>
<li><code v-pre>worker_connections</code>：每个进程能处理的最大连接数</li>
<li><code v-pre>epoll</code>：用<code v-pre>epoll</code>高效处理连接</li>
<li><code v-pre>multi_accept</code>：是否一次性接受所有新连接</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">events</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    worker_connections </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">2048</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    use </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">epoll</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    multi_accept </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>http</code>：定义网站相关的全局配置</strong>
<ul>
<li><code v-pre>include</code>：加载其它配置文件，可以是<strong>站点的配置文件</strong></li>
<li><code v-pre>default_type</code>：默认响应类型
<ul>
<li>如果<code v-pre>Nginx</code>无法识别客户端请求的文件类型，就会<strong>使用默认响应类型进行返回</strong></li>
</ul>
</li>
<li><code v-pre>keepalive_timeout</code>：长连接超时时间</li>
<li><code v-pre>gzip</code>：开启响应压缩
<ul>
<li>将<strong>文本类响应压缩后</strong>再发送给客户端，减少传输时间</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">http</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    include </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      /etc/nginx/mime.types;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    default_type </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> application/octet-stream;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    keepalive_timeout </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 65</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    gzip </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 后续包含 server 块</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>server</code>：定义一个虚拟主机，通过不同域名或者端口区分多个网站</strong>
<ul>
<li><code v-pre>listen 80</code>：监听80端口</li>
<li><code v-pre>server_name</code>：域名</li>
<li><code v-pre>root</code>：站点根目录</li>
<li><code v-pre>index</code>：默认首页文件</li>
<li><code v-pre>error</code>：自定义错误页面</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">      80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server_name </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> example.com;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    root </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        /var/www/html;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    index </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       index.html;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 后续包含 location 块</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong><code v-pre>location</code>：根据URI路径匹配不同的处理规则</strong>
<ul>
<li><strong>匹配语法</strong>
<ul>
<li><code v-pre>location /path/</code>：前缀匹配（区分大小写）</li>
<li><code v-pre>location ~ regex</code>：正则匹配（区分大小写）</li>
<li><code v-pre>location = /path</code>：精确匹配</li>
</ul>
</li>
<li><strong>核心指令</strong>
<ul>
<li><code v-pre>root</code>：文件系统路径</li>
<li><code v-pre>proxy_pass</code>：反向代理</li>
<li><code v-pre>try_files</code>：按顺序试文件</li>
<li><code v-pre>expires</code>：缓存控制
<ul>
<li><code v-pre>s</code>：秒</li>
<li><code v-pre>m</code>：分钟</li>
<li><code v-pre>h</code>：小时</li>
<li><code v-pre>d</code>：天</li>
<li><code v-pre>w</code>：周</li>
<li><code v-pre>m</code>：月</li>
<li><code v-pre>y</code>：年</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    try_files </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">uri</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/ /index.php?$</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">query_string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ~ </span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75">\.php$ </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    proxy_pass </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">  http://php_backend;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> ~* </span><span style="--shiki-light:#0184BC;--shiki-dark:#E06C75">\.(jpg|png)$ </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    root </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">/data/media;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    expires </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">7d</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>proxy_set_header</code>：配置请求头信息
<ul>
<li><code v-pre>Host</code>：客户端原始请求域名</li>
<li><code v-pre>Referer</code>：Referer头</li>
<li><code v-pre>Cookie</code>：Cookie头</li>
<li><code v-pre>X-Real-IP</code>：客户端真实IP</li>
<li><code v-pre>X-Forwarded-For</code>：代理链</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">proxy_set_header </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Host $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">host</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">proxy_set_header </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">X-Real-IP $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">remote_addr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">proxy_set_header </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">X-Forwarded-For $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">proxy_add_x_forwarded_for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">proxy_set_header </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">X-Forwarded-Proto $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scheme</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其它注意事项</strong></p>
<ul>
<li><code v-pre>$</code>：是<code v-pre>Nginx</code>内置变量，用于<strong>动态获取请求或服务器的信息</strong>
<ul>
<li><code v-pre>$uri</code>：当前请求的<code v-pre>uri</code>，不包含查询参数</li>
<li><code v-pre>$request_uri</code>：完整的原始请求<code v-pre>uri</code></li>
<li><code v-pre>$args</code>：查询参数</li>
<li><code v-pre>$host</code>：请求的主机名</li>
<li><code v-pre>$scheme</code>：请求协议</li>
</ul>
</li>
</ul>
<h4 id="配置文件架构" tabindex="-1"><a class="header-anchor" href="#配置文件架构"><span>配置文件架构</span></a></h4>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 主上下文（main context）中的指令</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">user </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">nobody;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 指定运行Nginx工作进程的系统用户（这里是'nobody'）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">events</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 连接处理相关的配置（事件驱动模型参数）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">http</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # HTTP协议相关的全局配置（影响所有虚拟服务器）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 第一个HTTP虚拟服务器的配置</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /one {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 处理以'/one'开头的URI请求的配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> /two {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">            # 处理以'/two'开头的URI请求的配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 第二个HTTP虚拟服务器的配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">stream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # TCP/UDP协议相关的全局配置（用于非HTTP流量，如数据库连接、邮件服务等）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 第一个TCP虚拟服务器的配置</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>架构层级关系如下</strong></p>
<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-"><span class="line"><span>main（全局）</span></span>
<span class="line"><span>├── events（事件模型）</span></span>
<span class="line"><span>├── http（HTTP服务）</span></span>
<span class="line"><span>│   ├── server（虚拟主机1）</span></span>
<span class="line"><span>│   │   ├── location /one（路径规则1）</span></span>
<span class="line"><span>│   │   └── location /two（路径规则2）</span></span>
<span class="line"><span>│   └── server（虚拟主机2）</span></span>
<span class="line"><span>└── stream（TCP/UDP服务）</span></span>
<span class="line"><span>    └── server（TCP服务1）</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡"><span>负载均衡</span></a></h3>
<p><strong>常见负载均衡算法</strong></p>
<ul>
<li>轮询</li>
<li>加权轮询</li>
<li>最少连接数：长连接，占用服务器资源场景</li>
<li>IP哈希：会话保持，同一用户<strong>访问同一后端</strong></li>
<li>响应时间优先：需要第三方模块，按<strong>后端响应速度</strong>动态调整</li>
</ul>
<p><strong>配置流程</strong></p>
<ul>
<li>在<code v-pre>http</code>下定义<code v-pre>upstream backend_servers</code></li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">http</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    upstream</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> backend_servers {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 定义后端服务器列表</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 192.168.1.101:8080;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 192.168.1.102:8080;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> 192.168.1.103:8080;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在<code v-pre>server</code>中配置代理，将请求转发到<code v-pre>upstream</code>组</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server_name </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">example.com;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        proxy_pass </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">http://backend_servers;  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 关键指令：指向 upstream 名称</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        proxy_set_header </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">Host $</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">host</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向"><span>重定向</span></a></h3>
<p>可以使用<code v-pre>return</code>或者<code v-pre>rewrite</code>进行<strong>重定向</strong>，可**对<code v-pre>server</code>和<code v-pre>location</code>**进行重定向</p>
<p><strong><code v-pre>return</code>语法</strong></p>
<ul>
<li><code v-pre>code</code>是HTTP状态码</li>
<li><code v-pre>URL</code>是重定向目标地址</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> code [URL/text];</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong><code v-pre>rewrite</code>语法</strong></p>
<ul>
<li><code v-pre>regex</code>是匹配URL的正则表达式</li>
<li><code v-pre>replacement</code>是替换后的URL</li>
<li><code v-pre>flag</code>可以是
<ul>
<li><code v-pre>last</code>：停止当前 <code v-pre>rewrite</code>规则，<strong>用修改后的URI重新匹配 <code v-pre>location</code></strong></li>
<li><code v-pre>break</code>：停止所有 <code v-pre>rewrite</code>处理，<strong>继续执行当前 <code v-pre>location</code>的剩余指令</strong></li>
<li><code v-pre>redirect</code>：302临时重定向</li>
<li><code v-pre>peamanent</code>：301永久重定向</li>
</ul>
</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">rewrite</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> regex replacement [flag];</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="跨域配置" tabindex="-1"><a class="header-anchor" href="#跨域配置"><span>跨域配置</span></a></h3>
<p><strong>跨域</strong>是浏览器的安全策略</p>
<ul>
<li>浏览器会<strong>阻止</strong>前端<code v-pre>Javascript</code>代码直接访问不同源的API</li>
<li>不同源指的就是<strong>协议、ip地址、端口号</strong>任意一个不相同</li>
</ul>
<p><strong>基础配置</strong></p>
<ul>
<li><code v-pre>add_header 'Access-Control-Allow-Origin'</code>：允许的域名</li>
<li><code v-pre>add_header 'Access-Control-Allow-Methods'</code>：允许的HTTP方法</li>
<li><code v-pre>add_header 'Access-Control-Allow-Headers'</code>：允许的请求头</li>
<li><code v-pre>add_header 'Access-Control-Allow-Credentials'</code>：允许浏览器携带Cookie</li>
</ul>
<div class="language-nginx line-numbers-mode" data-highlighter="shiki" data-ext="nginx" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-nginx"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">server</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    listen </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">80</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    server_name </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">api.example.com;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    location</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> / {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 允许的域名（生产环境建议替换为具体域名）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        add_header </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Access-Control-Allow-Origin'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> '*'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 允许的 HTTP 方法</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        add_header </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Access-Control-Allow-Methods'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'GET, POST, OPTIONS, PUT, DELETE'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 允许的请求头</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        add_header </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Access-Control-Allow-Headers'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'Content-Type, Authorization, X-Requested-With'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 允许浏览器携带 Cookie（需配合具体域名，不能为 *）</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        add_header </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Access-Control-Allow-Credentials'</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'true'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 预检请求（OPTIONS）缓存时间</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        add_header </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Access-Control-Max-Age'</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> 1728000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">        # 正常请求转发到后端</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">        proxy_pass </span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">http://backend_server;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常见状态码" tabindex="-1"><a class="header-anchor" href="#常见状态码"><span>常见状态码</span></a></h3>
<p><strong>1xx：信息类</strong></p>
<ul>
<li><code v-pre>100</code>：客户端继续发送请求</li>
<li><code v-pre>101</code>：协议切换</li>
</ul>
<p><strong>2xx：成功类</strong></p>
<ul>
<li><code v-pre>200</code>：请求成功</li>
<li><code v-pre>201</code>：Post创建成功</li>
<li><code v-pre>204</code>：请求成功但无返回内容</li>
</ul>
<p><strong>3xx：重定向类</strong></p>
<ul>
<li><code v-pre>301</code>：永久重定向</li>
<li><code v-pre>302/307</code>：临时重定向</li>
<li><code v-pre>304</code>：缓存有效</li>
</ul>
<p><strong>4xx：客户端错误</strong></p>
<ul>
<li><code v-pre>400</code>：请求语法错误</li>
<li><code v-pre>401</code>：未认证</li>
<li><code v-pre>403</code>：无权限</li>
<li><code v-pre>404</code>：资源不存在</li>
<li><code v-pre>405</code>：请求方法不允许</li>
<li><code v-pre>429</code>：请求过多，触发限流</li>
</ul>
<p><strong>5xx：服务端错误</strong></p>
<ul>
<li><code v-pre>500</code>：服务器内部错误</li>
<li><code v-pre>502</code>：网关错误</li>
<li><code v-pre>503</code>：服务不可用</li>
<li><code v-pre>504</code>：网关超时</li>
</ul>
</div></template>


