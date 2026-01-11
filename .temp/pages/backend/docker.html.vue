<template><div><p><a href="/pdfs/backend/docker.pdf">本页PDF</a></p>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h2>
<p>当我们利用Docker安装应用时，Docker会自动搜索并下载应用<strong>镜像</strong>。镜像不仅包含应用本身，还包含应用运行所需要的环境、配置、系统函数库。Docker会在运行镜像时创建一个<strong>隔离环境</strong>，称为<strong>容器</strong></p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">docker</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> run</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66"> -d</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">--name </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">mysql</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-p </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">3306:3306</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-e </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">TZ=Asia/Shanghai</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">-e </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">MYSQL_ROOT_PASSWORD=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">123</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2"> \</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">mysql</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>docker run</code>：创建并运行一个容器，<code v-pre>-d</code>是让容器在后台运行</p>
</li>
<li>
<p><code v-pre>--name mysql</code>：给容器起个名字，必须唯一</p>
</li>
<li>
<p><code v-pre>-p &lt;宿主机端口&gt;:&lt;容器端口&gt;</code>：设置端口映射</p>
<ul>
<li>docker的进程是对外隔离的</li>
<li>外部想要访问docker进程可以通过访问宿主机的端口从而访问到docker应用</li>
</ul>
</li>
<li>
<p><code v-pre>-e KEY = VALUE</code>：设置环境变量</p>
</li>
<li>
<p><code v-pre>mysql</code>：运行的镜像名</p>
<ul>
<li>
<p>一般由两部分组成：<code v-pre>[repository]:[tag]</code></p>
</li>
<li>
<p>其中<code v-pre>repository</code>是镜像名，<code v-pre>tag</code>是镜像版本</p>
</li>
</ul>
</li>
</ul>
<h3 id="常见命令" tabindex="-1"><a class="header-anchor" href="#常见命令"><span>常见命令</span></a></h3>
<figure><img src="/screenshot/backend/image-20250929204331485.png" alt="image-20250929204331485" tabindex="0" loading="lazy"><figcaption>image-20250929204331485</figcaption></figure>
<ul>
<li>
<p><code v-pre>docker pull</code>：从远程仓库拉取镜像</p>
</li>
<li>
<p><code v-pre>docker images</code>：查看本地镜像</p>
</li>
<li>
<p><code v-pre>docker rmi</code>：删除本地镜像</p>
</li>
<li>
<p><code v-pre>docker push</code>：将镜像推送到远程仓库</p>
</li>
<li>
<p><code v-pre>docker bulid</code>：根据<code v-pre>Dockerfile</code>构建镜像</p>
<ul>
<li><code v-pre>-t</code>：给镜像起名称，格式是<code v-pre>repository:tag</code></li>
<li><code v-pre>.</code>：指定Dockerfile所在的目录，如果在当前目录，指定为<code v-pre>.</code></li>
</ul>
</li>
<li>
<p><code v-pre>docker save</code>：将镜像保存为<code v-pre>tar</code>文件</p>
<ul>
<li><code v-pre>-o</code>：后面跟文件名称</li>
</ul>
</li>
<li>
<p><code v-pre>docker load</code>：从<code v-pre>tar</code>文件加载镜像</p>
<ul>
<li><code v-pre>docker load -i &lt;镜像文件.tar&gt;</code></li>
</ul>
</li>
<li>
<p><code v-pre>docker run</code>：创建并启动容器</p>
<ul>
<li><code v-pre>-d</code>：后台运行</li>
<li><code v-pre>--name</code>：后面跟容器名字</li>
<li><code v-pre>-p</code>：跟端口映射，<code v-pre>-p [宿主机端口]:[容器端口]</code></li>
<li><code v-pre>--network</code>：后面跟网络名称</li>
<li><code v-pre>-e</code>：设置环境变量
<ul>
<li>可以设置容器的环境变量</li>
</ul>
</li>
<li><code v-pre>--privileged</code>：特权模式
<ul>
<li>设置为<code v-pre>true</code>则允许<strong>容器访问宿主机设备</strong></li>
</ul>
</li>
<li><code v-pre>--hostname</code>：指定容器的主机名</li>
</ul>
</li>
<li>
<p><code v-pre>docker stop</code>：停止运行中的容器</p>
</li>
<li>
<p><code v-pre>docker start</code>：启动已停止的容器</p>
</li>
<li>
<p><code v-pre>docker ps</code>：查看运行中的容器</p>
<ul>
<li><code v-pre>-a</code>：显示所有容器</li>
</ul>
</li>
<li>
<p><code v-pre>docker rm</code>：删除容器</p>
<ul>
<li><code v-pre>-f</code>：强制删除</li>
</ul>
</li>
<li>
<p><code v-pre>docker logs</code>：查看容器日志</p>
<ul>
<li><code v-pre>-f</code>：持续跟踪日志</li>
</ul>
</li>
<li>
<p><code v-pre>docker exec</code>：进入容器或执行命令</p>
<ul>
<li><code v-pre>-it</code>：交互式终端</li>
</ul>
</li>
<li>
<p><code v-pre>docker update</code>：对容器信息进行更新</p>
</li>
</ul>
<h3 id="命令别名" tabindex="-1"><a class="header-anchor" href="#命令别名"><span>命令别名</span></a></h3>
<p>将别名写入<code v-pre>Shell</code>配置文件，如<code v-pre>~/.bashrc</code> 或者<code v-pre>~/.zshrc</code>，如下</p>
<div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-shell"><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2">alias</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> dps</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'docker ps -a'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>然后重新加载配置：<code v-pre>source ~/.bashrc</code></p>
<p>可以使用<code v-pre>alias</code>查看已定义的别名</p>
<h3 id="数据卷" tabindex="-1"><a class="header-anchor" href="#数据卷"><span>数据卷</span></a></h3>
<p><strong>数据卷</strong>是一个虚拟目录，是<strong>容器内目录</strong>和<strong>宿主机目录</strong>之间映射的桥梁</p>
<ul>
<li>容器删除后数据仍保留</li>
<li>直接修改宿主机文件，容器内实时生效</li>
</ul>
<figure><img src="/screenshot/backend/image-20250929210608574.png" alt="image-20250929210608574" tabindex="0" loading="lazy"><figcaption>image-20250929210608574</figcaption></figure>
<p><strong>常用命令</strong></p>
<ul>
<li><code v-pre>docker volume create</code>：创建数据卷</li>
<li><code v-pre>docker volume ls</code>：查看所有数据卷</li>
<li><code v-pre>docker volume rm</code>：删除指定数据卷</li>
<li><code v-pre>docker volume inspect</code>：查看某个数据卷详情</li>
<li><code v-pre>docker volume prune</code>：清除数据卷</li>
</ul>
<p><strong>数据挂载</strong></p>
<ul>
<li>在执行<code v-pre>dokcer run</code>命令的时候，使用<code v-pre>-v 数据卷:容器内目录</code>可以完成数据卷挂载</li>
<li>使用<code v-pre>-v 本地目录:容器内目录</code>可以完成数据在本地目录的挂载
<ul>
<li>必须以<code v-pre>/</code>或者<code v-pre>./</code>开头，否则会被识别成数据卷</li>
</ul>
</li>
<li>宿主机默认目录：<code v-pre>/var/lib/docker/volumes/</code>
<ul>
<li>数据卷存储位置：<code v-pre>/var/lib/docker/volumes/数据卷名称/_data/</code></li>
</ul>
</li>
<li>容器默认目录：<code v-pre>/var/lib/docker/</code>
<ul>
<li>数据卷存储位置：<code v-pre>/var/lib/docker/volumes/</code></li>
</ul>
</li>
</ul>
<h3 id="自定义镜像" tabindex="-1"><a class="header-anchor" href="#自定义镜像"><span>自定义镜像</span></a></h3>
<p><strong>镜像结构</strong></p>
<ul>
<li>采用分层存储结构</li>
<li>由多个**只读层（Layers）**堆叠而成</li>
<li>可以共享很多基础的层</li>
</ul>
<figure><img src="/screenshot/backend/image-20250929225240951.png" alt="image-20250929225240951" tabindex="0" loading="lazy"><figcaption>image-20250929225240951</figcaption></figure>
<h4 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile"><span>Dockerfile</span></a></h4>
<p><code v-pre>Dockerfile</code>（<strong>定义Docker镜像的结构和构建逻辑</strong>）就是一个文本文件，其中包含一个个的指令，用指令来<strong>说明要执行什么操作来构建镜像</strong></p>
<p><strong>常见语法</strong></p>
<ul>
<li><code v-pre>FROM</code>：指定基础镜像</li>
<li><code v-pre>ENV</code>：设置环境变量</li>
<li><code v-pre>COPY</code>：拷贝本地文件到镜像的指定目录</li>
<li><code v-pre>RUN</code>：执行Linux的shell命令</li>
<li><code v-pre>EXPOSE</code>：指定容器运行时监听的端口</li>
<li><code v-pre>ENTRYPOINT</code>：镜像中应用的启动命令，容器运行时调用</li>
</ul>
<h3 id="网络" tabindex="-1"><a class="header-anchor" href="#网络"><span>网络</span></a></h3>
<p>默认情况下，所有容器都是以bridge方式连接到Docker的一个虚拟网桥上：</p>
<figure><img src="/screenshot/backend/image-20250930114318613.png" alt="image-20250930114318613" tabindex="0" loading="lazy"><figcaption>image-20250930114318613</figcaption></figure>
<p><strong>加入自定义网络的容器才可以通过容器名相互访问</strong>，常见命令如下：</p>
<ul>
<li>
<p><code v-pre>docker network create</code>：创建一个网络</p>
</li>
<li>
<p><code v-pre>docker network ls</code>：查看所有网络</p>
</li>
<li>
<p><code v-pre>docker network rm</code>：删除指定网络</p>
</li>
<li>
<p><code v-pre>docker network prune</code>：清楚未使用的网络</p>
</li>
<li>
<p><code v-pre>docker network connect</code>：使指定容器加入某网络</p>
<ul>
<li><code v-pre>docker network connect [网络名] [容器名]</code></li>
</ul>
</li>
<li>
<p><code v-pre>docker network disconnect</code>：使指定容器离开某网络</p>
</li>
<li>
<p><code v-pre>docker network inspect</code>：查看网络详细信息</p>
</li>
</ul>
<h3 id="dockercompose" tabindex="-1"><a class="header-anchor" href="#dockercompose"><span>DockerCompose</span></a></h3>
<p>通过一个单独的<code v-pre>docker-compose.yml</code>文件来定义一组相关联的应用容器，帮助<strong>我们实现多个相互关联的Docker容器的快速部署</strong></p>
<p><strong>格式</strong></p>
<ul>
<li>
<p><code v-pre>version</code>：项目版本</p>
</li>
<li>
<p><code v-pre>services</code>：容器</p>
<ul>
<li><code v-pre>image</code>：镜像名称</li>
<li><code v-pre>container_name</code>：容器名称（自定义）</li>
<li><code v-pre>port</code>：端口映射</li>
<li><code v-pre>environment</code>：环境变量</li>
<li><code v-pre>volumes</code>：数据卷挂载</li>
<li><code v-pre>networks</code>：网络名称</li>
<li><code v-pre>build</code>：构建镜像
<ul>
<li><code v-pre>context</code>：目录</li>
<li><code v-pre>dockerfile</code>：</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code v-pre>networks</code>：网络配置</p>
<ul>
<li><code v-pre>name</code>：网络名称</li>
</ul>
</li>
</ul>
<p><strong>构建命令格式</strong></p>
<ul>
<li><code v-pre>docker compose [OPTIONS] [COMMAND]</code></li>
<li><code v-pre>Options</code>
<ul>
<li><code v-pre>-f</code>：指定<code v-pre>compose</code>文件的路径和名称</li>
<li><code v-pre>-p</code>：指定<code v-pre>project</code>名称</li>
</ul>
</li>
<li><code v-pre>command</code>
<ul>
<li><code v-pre>up</code>：创建并启动所有<code v-pre>service</code>容器</li>
<li><code v-pre>down</code>：停止并移除所有容器、网络</li>
<li><code v-pre>ps</code>：列出所有启动的容器</li>
<li><code v-pre>logs</code>：查看指定容器日志</li>
<li><code v-pre>stop</code>：停止容器</li>
<li><code v-pre>start</code>：启动容器</li>
<li><code v-pre>restart</code>：重启容器</li>
<li><code v-pre>top</code>：查看运行的进程</li>
<li><code v-pre>exec</code>：在指定的运行中容器执行命令</li>
</ul>
</li>
</ul>
</div></template>


