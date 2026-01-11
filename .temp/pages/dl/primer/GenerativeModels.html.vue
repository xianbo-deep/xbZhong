<template><div><p><a href="/pdfs/dl/primer/GenerativeModels.pdf">本页PDF</a></p>
<h2 id="pixelrnn" tabindex="-1"><a class="header-anchor" href="#pixelrnn"><span>PixelRNN</span></a></h2>
<ul>
<li>
<p>随机给一个像素，给予模型<strong>random</strong>值</p>
</li>
<li>
<p>本质上是根据已生成的结果生成新的输出，会考虑<strong>当前时间点</strong>之前的<strong>所有</strong>输出</p>
</li>
<li>
<p>一个像素一个像素生成</p>
</li>
</ul>
<h2 id="generative-adversarial-network-gan-生成对抗网络" tabindex="-1"><a class="header-anchor" href="#generative-adversarial-network-gan-生成对抗网络"><span>Generative Adversarial Network（GAN 生成对抗网络）</span></a></h2>
<p><strong>工作原理</strong></p>
<ul>
<li>两个网络同时训练，形成一个动态对抗系统</li>
<li>生成器学习生成更逼真的数据</li>
<li>判别器学习更准确地识别真假数据</li>
<li>当判别器无法识别生成器生成的数据是真是假时，生成器就成功了</li>
</ul>
<h3 id="generator-生成器" tabindex="-1"><a class="header-anchor" href="#generator-生成器"><span>Generator（生成器）</span></a></h3>
<p><strong>工作流程</strong></p>
<ul>
<li>接收<strong>随机噪声</strong>作为输入</li>
<li>尝试将这些噪声转换成看起来<strong>真实</strong>的数据(如图像、文本等)</li>
<li>目标是生成能够**&quot;欺骗&quot;**判别器的数据</li>
</ul>
<h3 id="discriminator-判别器" tabindex="-1"><a class="header-anchor" href="#discriminator-判别器"><span>Discriminator（判别器）</span></a></h3>
<p><strong>工作流程</strong></p>
<ul>
<li>接收真实数据样本和生成器创建的假数据样本</li>
<li>尝试区分哪些是真实的，哪些是假的</li>
<li>目标是正确地分类真实和生成的数据</li>
</ul>
<h3 id="divergence-散度" tabindex="-1"><a class="header-anchor" href="#divergence-散度"><span><strong>Divergence（散度）</strong></span></a></h3>
<p><em>是指两个概率分布之间的差异或距离的度量</em></p>
<ul>
<li><strong>目标函数</strong>：GAN的训练目标可以被表述为<strong>最小化</strong>真实数据分布和生成数据分布之间的某种散度</li>
</ul>
<h3 id="mode-collapse" tabindex="-1"><a class="header-anchor" href="#mode-collapse"><span>Mode Collapse</span></a></h3>
<p><RouteLink to="/dl/cv/DiffusionModel.html">Diffusion（扩散模型）</RouteLink></p>
</div></template>


