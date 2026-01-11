<template><div><p><a href="/pdfs/coding/Seaborn.pdf">本页PDF</a></p>
<h2 id="导包" tabindex="-1"><a class="header-anchor" href="#导包"><span>导包</span></a></h2>
<p><code v-pre>import seaborn as sns</code></p>
<h2 id="数据集" tabindex="-1"><a class="header-anchor" href="#数据集"><span>数据集</span></a></h2>
<p><strong>seaborn内置了多个数据集，可以用sns.load_dataset()来读取</strong></p>
<ul>
<li><code v-pre>sns.load_dataset(name, cache=True, data_home=None, **kwargs)</code>
<ul>
<li><strong><code v-pre>name</code></strong>: 数据集的名称，字符串类型。例如，可以是 <code v-pre>'tips'</code>、<code v-pre>'iris'</code>、<code v-pre>'flights'</code> 等。</li>
<li><strong><code v-pre>cache</code></strong>: 布尔值，指定是否将下载的数据集缓存到本地（默认值为 <code v-pre>True</code>）。</li>
<li><strong><code v-pre>data_home</code></strong>: 数据集缓存的位置，默认为 <code v-pre>~/.seaborn-data</code>。</li>
<li><strong><code v-pre>**kwargs</code></strong>: 其他参数，可选，用于传递给数据加载函数。</li>
</ul>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> seaborn </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 加载名为car_crashes的数据集</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">data </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">load_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'car_crashes'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分布图" tabindex="-1"><a class="header-anchor" href="#分布图"><span>分布图</span></a></h2>
<ul>
<li><code v-pre>sns.displot(data=None, x=None, y=None, kind='hist', ...)</code>:绘制分布图
<ul>
<li><strong><code v-pre>data</code></strong>: 输入数据，可以是 DataFrame、数组或列表。</li>
<li><strong><code v-pre>x</code></strong>: 需要绘制分布的变量名（x 轴）。</li>
<li><strong><code v-pre>y</code></strong>: 选择的变量名（可选），用于绘制散点图等。</li>
<li><strong><code v-pre>kind</code></strong>: 指定绘制的图形类型，<code v-pre>'hist'</code>（默认）绘制直方图，<code v-pre>'kde'</code> 绘制核密度估计图。</li>
</ul>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 绘制分布图</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> seaborn </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> matplotlib.pyplot </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> plt</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> numpy </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 生成随机数据</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">seed</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">data </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> np.random.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">randn</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">1000</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 使用 displot 绘制分布图</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">displot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(data, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">kde</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># kde=True 添加核密度估计</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 设置标题</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">plt.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Distribution of Random Data'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 显示图形</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">plt.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">show</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="联合图" tabindex="-1"><a class="header-anchor" href="#联合图"><span>联合图</span></a></h2>
<ul>
<li>
<p><code v-pre>sns.jointplot(x, y, data, kind)</code></p>
<ul>
<li>
<p><strong><code v-pre>x</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>str</code></p>
</li>
<li>
<p>描述：要在 x 轴上绘制的变量的名称。</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>y</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>str</code></p>
</li>
<li>
<p>描述：要在 y 轴上绘制的变量的名称。</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>data</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>DataFrame</code></p>
</li>
<li>
<p>描述：要使用的数据集，通常是 Pandas 的 DataFrame。</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>kind</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>str</code></p>
</li>
<li>
<p>描述：指定要绘制的图的类型。可选值包括：</p>
<ul>
<li><code v-pre>'scatter'</code>：散点图。</li>
<li><code v-pre>'kde'</code>：核密度估计图。</li>
<li><code v-pre>'hist'</code>：直方图。</li>
<li><code v-pre>'hex'</code>：六边形热图。</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> seaborn </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> matplotlib.pyplot </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> plt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 加载示例数据集</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tips </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">load_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tips"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 创建 jointplot</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">jointplot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">x</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'total_bill'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">y</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'tip'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">data</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tips, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">kind</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'scatter'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 显示图形</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">plt.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">show</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="核密度图" tabindex="-1"><a class="header-anchor" href="#核密度图"><span>核密度图</span></a></h2>
<p><strong>生成概率密度图，平滑曲线</strong></p>
<ul>
<li>
<p><code v-pre>sns.kdeplot(x,y,)</code></p>
<ul>
<li>
<p><strong><code v-pre>data</code></strong>:</p>
<ul>
<li>类型：<code v-pre>array-like</code> 或 <code v-pre>DataFrame</code></li>
<li>描述：用于计算核密度估计的输入数据。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>x</code></strong>:</p>
<ul>
<li>类型：<code v-pre>str</code> 或 <code v-pre>array-like</code></li>
<li>描述：要绘制的变量名称。如果提供 <code v-pre>data</code>，则此参数应为变量的名称。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>bw_adjust</code></strong>:</p>
<ul>
<li>类型：<code v-pre>float</code>
<ul>
<li>描述：用于控制核密度估计的带宽的调整因子。带宽越大，曲线越平滑；带宽越小，曲线越细致。默认值为 <code v-pre>1</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>fill</code></strong>:</p>
<ul>
<li>类型：<code v-pre>bool</code>
<ul>
<li>描述：是否填充 KDE 曲线下方的区域，默认值为 <code v-pre>False</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>color</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>str</code></p>
</li>
<li>
<p>描述：指定绘图的颜色。</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>alpha</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>float</code></p>
</li>
<li>
<p>描述：填充区域的透明度，取值范围为 <code v-pre>0</code> 到 <code v-pre>1</code>，默认值为 <code v-pre>1</code>。</p>
</li>
</ul>
</li>
<li>
<p><strong><code v-pre>ax</code></strong>:</p>
<ul>
<li>类型：<code v-pre>matplotlib.axes.Axes</code></li>
<li>描述：可选参数，指定在哪个坐标轴上绘制图形。</li>
</ul>
</li>
<li>
<p><strong><code v-pre>legend</code></strong>:</p>
<ul>
<li>
<p>类型：<code v-pre>bool</code></p>
</li>
<li>
<p>描述：是否显示图例，默认值为 <code v-pre>True</code>。</p>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> seaborn </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> matplotlib.pyplot </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">as</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> plt</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 加载示例数据集</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tips </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">load_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tips"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 绘制总账单的核密度估计图</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">sns.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">kdeplot</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">data</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tips[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'total_bill'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">], </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">fill</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">color</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'blue'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">bw_adjust</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">0.5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 添加标题</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">plt.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">title</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'Kernel Density Estimate of Total Bill'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">## 显示图形</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">plt.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">show</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h2>
<h2 id="-1" tabindex="-1"><a class="header-anchor" href="#-1"><span></span></a></h2>
<h2 id="-2" tabindex="-1"><a class="header-anchor" href="#-2"><span></span></a></h2>
</div></template>


