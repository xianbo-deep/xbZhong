<template><div><p><a href="/pdfs/backend/GitHubActions.pdf">本页PDF</a></p>
<h2 id="githubaction" tabindex="-1"><a class="header-anchor" href="#githubaction"><span>GithubAction</span></a></h2>
<p>Github提供的一个<strong>持续集成与持续部署(CI/CD)平台</strong></p>
<p>可以在<strong>代码提交、拉取请求、发布版本</strong>等事件发生时，<strong>自动执行脚本或者流程</strong></p>
<p>免费额度：2000分钟/月</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3>
<p>需要在<code v-pre>.github/workflows</code>下创建一份<code v-pre>yml</code>文件，里面编写我们的脚本</p>
<p><strong>示例</strong></p>
<div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-yml"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">部署前端项目到 GitHub Pages</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 工作流名称，会显示在 Actions 页面中</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ---------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 👇 on：定义触发条件</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ---------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66">on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:                            </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 当有 push 事件时触发</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    branches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:                      </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 限制触发的分支</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">main</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                       # 仅当推送到 main 分支时才触发</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  workflow_dispatch</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:               </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 允许手动在 GitHub 页面点击“Run workflow”执行</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ---------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 👇 jobs：定义要执行的任务</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># ---------------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">jobs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  build-and-deploy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:                </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 任务名（可以自定义）</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    runs-on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">ubuntu-latest</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         # 使用最新版本的 Ubuntu 虚拟机环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # -----------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # 👇 steps：定义任务中的每一步</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">    # -----------------------------------------------------</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 1 步：检出代码（拉取当前仓库内容）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Checkout repository</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">actions/checkout@v4</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 2 步：设置 Node.js 运行环境</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Setup Node.js</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">actions/setup-node@v4</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">          node-version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">18</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         # 指定 Node.js 版本为 18</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 3 步：安装依赖</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Install dependencies</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">npm install</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">           # 执行命令行指令</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 4 步：构建项目</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Build project</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">npm run build</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">         # 构建结果一般输出到 dist 目录</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 5 步：部署到 GitHub Pages</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Deploy to GitHub Pages</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">peaceiris/actions-gh-pages@v3</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">          github_token</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">${{ secrets.GITHUB_TOKEN }}</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">   # 内置的仓库访问令牌</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">          publish_dir</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">./dist</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">                        # 指定要发布的目录（构建产物）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">      # 第 6 步（可选）：部署完成后打印信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">Done</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">echo "🚀 部署完成！"</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>name</code>：工作流名称</li>
<li><code v-pre>on</code>：选择要触发的事件类型
<ul>
<li><code v-pre>push</code>：推送时触发</li>
<li><code v-pre>pull_request</code>：别人提交合并请求时触发</li>
<li><code v-pre>schedule</code>：定时触发
<ul>
<li><code v-pre>branches</code>：指定会触发这个工作流的<strong>分支的事件</strong></li>
</ul>
</li>
</ul>
</li>
<li><code v-pre>jobs</code>：顶级字段，包含多个job，job的名字可以自定义
<ul>
<li><code v-pre>run-on</code>：运行环境，支持三种操作系统
<ul>
<li>有<code v-pre>ubuntu-latest</code>、<code v-pre>windows-latest</code>、<code v-pre>macos-latest</code></li>
</ul>
</li>
<li><code v-pre>steps</code>：操作步骤，每个step前面用<code v-pre>-</code>区分
<ul>
<li><code v-pre>run</code>：执行``</li>
<li><code v-pre>uses</code>：调用别人写好的自动化模块</li>
<li><code v-pre>with</code>：传递参数给<code v-pre>uses</code>或者<code v-pre>run</code></li>
<li><code v-pre>|</code>：多个命令一起运行</li>
</ul>
</li>
<li><code v-pre>env</code>：设置环境变量</li>
</ul>
</li>
<li><code v-pre>secrets</code>：存储敏感信息，在仓库设置里进行配置</li>
<li><code v-pre>timeout-minutes</code>：设置超时时间
<ul>
<li>可以在<code v-pre>job</code>或者<code v-pre>step</code>下进行设置</li>
</ul>
</li>
</ul>
</div></template>


