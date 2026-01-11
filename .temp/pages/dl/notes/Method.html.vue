<template><div><p><a href="/pdfs/dl/notes/Method.pdf">本页PDF</a></p>
<p><strong>模型压缩三部分优化</strong>：</p>
<ol>
<li>减少内存密集的范围量</li>
<li>提高获取模型参数时间</li>
<li>加速模型推理时间</li>
</ol>
<h2 id="模型剪枝-pruning" tabindex="-1"><a class="header-anchor" href="#模型剪枝-pruning"><span>模型剪枝（Pruning）</span></a></h2>
<p>研究模型权重的冗余，尝试<strong>删除/修改</strong>冗余或者非关键权重，会<strong>改变模型参数量</strong></p>
<figure><img src="/screenshot/dl/image-20250703160937958.png" alt="image-20250703160937958" tabindex="0" loading="lazy"><figcaption>image-20250703160937958</figcaption></figure>
<h3 id="剪枝算法分类" tabindex="-1"><a class="header-anchor" href="#剪枝算法分类"><span>剪枝算法分类</span></a></h3>
<ul>
<li><strong>非结构化剪枝</strong>：剪枝算法简单，模型压缩比高，<strong>权重矩阵会稀疏</strong></li>
<li><strong>结构化剪枝</strong>：在<strong>channel和layer</strong>上进行剪枝，保留原始卷积结构，但算法相对复杂</li>
</ul>
<h3 id="模型剪枝流程" tabindex="-1"><a class="header-anchor" href="#模型剪枝流程"><span>模型剪枝流程</span></a></h3>
<p><strong>常见三种方法</strong></p>
<ol>
<li>训练一个模型-&gt;对模型进行剪枝-&gt;对剪枝后的模型进行微调</li>
<li>在模型训练过程中进行剪枝-&gt;对剪枝后的模型进行微调</li>
<li>进行剪枝-&gt;从头训练剪枝后的模型</li>
</ol>
<h2 id="模型量化-quantization" tabindex="-1"><a class="header-anchor" href="#模型量化-quantization"><span>模型量化（Quantization）</span></a></h2>
<p><strong>减少</strong>权重表示或激活所需的<strong>比特数</strong>来压缩模型，也就是降低模型参数的精度，<strong>是不改变模型参数量的</strong></p>
<figure><img src="/screenshot/dl/image-20250703160948495.png" alt="image-20250703160948495" tabindex="0" loading="lazy"><figcaption>image-20250703160948495</figcaption></figure>
<h2 id="模型蒸馏" tabindex="-1"><a class="header-anchor" href="#模型蒸馏"><span>模型蒸馏</span></a></h2>
<p>核心思想是通过让小型学生模型（<strong>Student Model</strong>）模仿大型教师模型（<strong>Teacher Model</strong>）的行为或知识，从而在保持较高性能的同时大幅减少模型的计算量和参数量</p>
<p>我第一段实习的时候做的是<strong>知识蒸馏</strong>，教师模型仅作<strong>推理任务</strong>，直接生成数据给小模型训练</p>
<h3 id="知识蒸馏" tabindex="-1"><a class="header-anchor" href="#知识蒸馏"><span>知识蒸馏</span></a></h3>
<p><strong>教师模型指导学生模型训练</strong>，通过<strong>蒸馏</strong>的方式让学生模型学习到教师模型的认识</p>
</div></template>


