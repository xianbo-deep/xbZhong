<template><div><p><a href="/pdfs/backend/SpringAI.pdf">本页PDF</a></p>
<h2 id="springai" tabindex="-1"><a class="header-anchor" href="#springai"><span>SpringAI</span></a></h2>
<p><strong>使用步骤</strong></p>
<ul>
<li>
<p>引入依赖</p>
<ul>
<li>引入<code v-pre>SpringAI</code>父工程依赖进行<code v-pre>SpringAI</code>其它依赖的统一版本管理</li>
</ul>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-xml"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencyManagement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>org.springframework.ai&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>spring-ai-bom&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>${spring-ai.version}&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>pom&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>import&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">scope</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencies</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependencyManagement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>引入模型对应的依赖，如ollama</li>
</ul>
<div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-xml"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>org.springframework.ai&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    &#x3C;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">>spring-ai-ollama-spring-boot-starter&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置模型</p>
<ul>
<li>以ollama为例，在配置文件指定访问的url和模型名称，还可以<strong>加生成参数</strong></li>
</ul>
<div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-yml"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">spring</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> ai</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">  ollama</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">   base-url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">访问url</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">   chat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75">    model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">模型名称</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置客户端</p>
<ul>
<li>需要自定义配置类，通过第三方bean的注册方式注册客户端</li>
<li>Bean对象的类名为**<code v-pre>ChatClient</code><strong>，构造方法传入的参数为</strong><code v-pre>OllamaChatModel</code>**，并且使用构建器<code v-pre>builder</code>创建对象</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ChatClient</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> chatClient</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">OllamaChatModel</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75"> model){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> ChatClient</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">builder</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(model)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">defaultSystem</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"你是可爱的助手"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">build</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在业务逻辑区使用<strong>依赖注入</strong>，注入<code v-pre>chatClient</code>，并进行信息发送</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B">Autowired</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">private</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ChatClient</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> chatClient</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">;</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75"> content </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> chatClient</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">prompt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">user</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"你是谁"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">call</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">    .</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF">content</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>常用方法</strong></p>
<ul>
<li>
<p><code v-pre>ChatClient.defaultSystem()</code>：设置系统提示词</p>
</li>
<li>
<p><code v-pre>ChatClient.defaultAdvisors()</code>：配置Advisor</p>
</li>
<li>
<p><code v-pre>chatClient.prompt()</code>：构建提示词</p>
</li>
<li>
<p><code v-pre>chatClient.user()</code>：构建用户提示词</p>
</li>
<li>
<p><code v-pre>chatClient.call()</code>：发送阻塞请求</p>
</li>
<li>
<p><code v-pre>chatClient.stream()</code>：发送流式生成请求，但是返回值需要声明为**<code v-pre>Flux&lt;String&gt; content</code>**</p>
</li>
<li>
<p><code v-pre>chatClient.content()</code>：获取生成的内容</p>
</li>
<li>
<p><code v-pre>chatClient.advisors()</code>：生成时使用的<strong>环绕增强器</strong>，可以向context增加上下文</p>
<ul>
<li><code v-pre>.advisors(a -&gt; a.param(CHAT_MEMORY_CONVERSATION_ID_KEY,chatId))</code>：向context增加一个会话ID参数
<ul>
<li><code v-pre>CHAT_MEMORY_CONVERSATION_ID_KEY</code>是由**<code v-pre>AbstractChatMemoryAdvisor</code>**抽象类声明的</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="会话日志" tabindex="-1"><a class="header-anchor" href="#会话日志"><span>会话日志</span></a></h3>
<p><code v-pre>SpringAI</code>利用<strong>AOP</strong>原理提供了AI会话时的拦截、增强等功能，也就是**<code v-pre>Advisor</code><strong>，在</strong>初始化<code v-pre>chatClient</code>时进行配置**</p>
<figure><img src="/screenshot/backend/image-20250915194026653.png" alt="image-20250915194026653" tabindex="0" loading="lazy"><figcaption>image-20250915194026653</figcaption></figure>
<p><strong>Advisor接口的实现类</strong></p>
<ul>
<li><code v-pre>SimpleLoggerAdvisor</code>：记录日志</li>
<li><code v-pre>MessageChatMemoryAdvisor</code>：实现会话记忆功能</li>
<li><code v-pre>QuestionAnswerAdvisor</code>：实现RAG的功能</li>
</ul>
<h3 id="会话记忆" tabindex="-1"><a class="header-anchor" href="#会话记忆"><span>会话记忆</span></a></h3>
<p><strong>使用步骤：</strong></p>
<ul>
<li>
<p>定义会话存储方式</p>
<ul>
<li><strong><code v-pre>SpringAI</code>定义的会话记忆接口</strong>，我们可以来实现这个接口，自定义存储方式（可以存储在Redis、MongoDB等）</li>
</ul>
<div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD"> interface</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B"> ChatMemory</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> conversationId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Message</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">> </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">messages</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">    List</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">&#x3C;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">Message</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">></span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> get</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> conversationId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> lastN</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">    void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF"> clear</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B">String</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic"> conversationId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">}</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>SpringAI</code>默认定义的接口实现类：<strong><code v-pre>InMemoryChatMemory</code></strong>（默认存储在内存中）</li>
</ul>
</li>
<li>
<p>配置会话记忆Advisor</p>
<ul>
<li>在<code v-pre>ChatClient.defaultAdvisors()</code>中进行配置</li>
</ul>
</li>
<li>
<p>添加会话id</p>
<ul>
<li>使用<code v-pre>chatClient.advisors()</code>添加会话id参数</li>
</ul>
</li>
</ul>
<h3 id="会话历史" tabindex="-1"><a class="header-anchor" href="#会话历史"><span>会话历史</span></a></h3>
<p><strong>实现步骤</strong>：</p>
<ul>
<li>存储<code v-pre>chatId</code>，可以存储在数据库</li>
<li>根据<code v-pre>chatId</code>调用<code v-pre>ChatMemory</code>的<code v-pre>get</code>方法<strong>获取消息列表进行返回</strong></li>
</ul>
</div></template>


