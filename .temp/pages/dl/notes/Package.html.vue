<template><div><p><a href="/pdfs/dl/notes/Package.pdf">本页PDF</a></p>
<p>如果碰到服务器无法访问外网情况，可设置环境变量</p>
<ul>
<li>
<p>在文件开始写入这两行代码，代表访问HG的镜像社区</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD">import</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> os</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">os.environ[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">'HF_ENDPOINT'</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">] </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379"> 'https://hf-mirror.com'</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>或者在终端输入 <code v-pre>export USE_MODELSCOPE_HUB=1</code>或者<code v-pre>export HF_ENDPOINT=https://hf-mirror.com</code></p>
</li>
</ul>
<p>peft是一个微调开源库，导入<code v-pre>peft</code>名下的<code v-pre>LoraConfig</code>与<code v-pre>get_peft_model</code>，可以快速完成微调</p>
<ul>
<li>
<p>LoraConfig</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.loraconfig </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">  LoraConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            r</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"r"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            target_modules</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"target_modules"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            bias</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"bias"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            lora_alpha</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora_alpha"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            lora_dropout</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"lora_dropout"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>r</code>：秩，直接决定微调的参数量</li>
<li><code v-pre>lora_alpha</code>：一般为2r或者r</li>
<li><code v-pre>lora_dropout</code>：随机将低秩矩阵参数置0</li>
<li><code v-pre>target_modules</code>：对哪几个层进行微调</li>
</ul>
</li>
<li>
<p>get_peft_model</p>
<ul>
<li>
<p>传入加载好的模型和配置好的lora参数，可以得到一个配置好的模型</p>
</li>
<li>
<p><code v-pre>.print_trainable_parameters()</code>可以查看能微调多少参数</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.peft_model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> get_peft_model</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.model,</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.loraconfig)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">        self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.peft_model.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">print_trainable_parameters</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">()</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<p>导入<code v-pre>transformers</code>，可以快速加载模型，提词器，以及量化配置</p>
<ul>
<li>
<p><code v-pre>AutoModelForCausalLM</code></p>
<ul>
<li>
<p>加载预训练模型的工具</p>
<ul>
<li><code v-pre>device_map</code>：使用什么设备加载模型参数</li>
<li><code v-pre>quantization_config</code>：量化配置</li>
<li><code v-pre>trust_remote_code</code>：是否信任远程代码</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.model </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> AutoModelForCausalLM.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_pretrained</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model_path"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            device_map</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"device_map"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            trust_remote_code</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"trust_remote_code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            quantization_config</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">quan_configs,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>AutoTokenizer</code></p>
<ul>
<li>
<p><strong>自动化分词器加载工具</strong>，将文本转换为模型可理解的数字形式，指定了模型路径会自动下载匹配的分词器</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> AutoTokenizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">from_pretrained</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model_path"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            trust_remote_code</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tokenizer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"trust_remote_code"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>用分词器处理文本</p>
<ul>
<li>
<p><code v-pre>max_length</code>：能接受的文本最大长度，超过这个长度则截断</p>
</li>
<li>
<p><code v-pre>return_tensors</code>：可为<code v-pre>pt</code>，最后返回的就是张量</p>
</li>
<li>
<p>``truncation`：采取何种截断方式</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> tokenized </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">tokenizer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            combined_texts,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            truncation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">         max_length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tokenizer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"max_length"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            padding</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">False</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            return_tensors</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">None</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic">  # 返回Python列表而不是张量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>.tokenizer.encode</code>：将原始文本（字符串）转换为模型可理解的 Token ID 序列</p>
<ul>
<li>
<p><code v-pre>text</code>：输入文本</p>
</li>
<li>
<p><code v-pre>add_special_tokens</code>：是否添加特殊token</p>
</li>
<li>
<p><code v-pre>max_length</code>：截断</p>
</li>
<li>
<p><code v-pre>truncation</code>：是否启用截断</p>
</li>
<li>
<p><code v-pre>rerturn_tensors</code>：返回格式（如<code v-pre>pt</code>）</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">turn_tokens </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">encode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">                    self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">apply_chat_template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">([turn], </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">tokenize</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">False</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">),</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                    add_special_tokens</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">False</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>.apply_chat_template</code>：将多轮对话历史转换为模型所需的标准化格式</p>
<ul>
<li>
<p><code v-pre>tokenize</code>：是否返回token IDs，为true则返回模型能理解的数字</p>
</li>
<li>
<p><code v-pre>return_tensors</code>：返回张量格式，<code v-pre>&quot;pt&quot;</code> (PyTorch), <code v-pre>&quot;np&quot;</code> (NumPy)</p>
</li>
<li>
<p><code v-pre>max_length</code>：最大token长度</p>
</li>
<li>
<p><code v-pre>truncation</code>：超长是否截断</p>
</li>
<li>
<p><code v-pre>padding</code>：填充方式，<code v-pre>&quot;longest&quot;</code>、<code v-pre>True</code>、<code v-pre>False</code></p>
</li>
<li>
<p><code v-pre>return_dict</code>：是否返回字典格式</p>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">tokenized </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">apply_chat_template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">                conversation,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                tokenize</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                max_length</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tokenizer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"max_length"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                truncation</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"tokenizer"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"truncation"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                return_tensors</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">None</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">                return_dict</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">True</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">            )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>BitsAndBytesConfig</code></p>
<ul>
<li>
<p>模型量化的工具，最后要作为参数传入给<code v-pre>load_model</code></p>
<ul>
<li><code v-pre>load_in_8bit</code>：最后以8bit整数保存模型参数</li>
<li><code v-pre>load_in_4bit</code>：最后以4bit整数保存模型</li>
<li><code v-pre>torch_dtype</code>：模型训练的过程的中使用的参数类型</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> quan_configs </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> BitsAndBytesConfig</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            load_in_8bit</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"load_in_8bit"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            torch_dtype</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"torch_dtype"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>Trainer</code></p>
<ul>
<li>
<p>训练执行引擎</p>
<ul>
<li>
<p><code v-pre>model</code>：待训练的模型，微调的话则需要传入<code v-pre>peft_model</code></p>
</li>
<li>
<p><code v-pre>tokenizer</code>：分词器</p>
</li>
<li>
<p><code v-pre>args</code>：<code v-pre>TrainingArguments</code>实例</p>
</li>
<li>
<p><code v-pre>train_dataset</code>：训练集</p>
</li>
<li>
<p><code v-pre>eval_dataset</code>：测试集</p>
</li>
<li>
<p><code v-pre>data_collator</code>：数据整理器</p>
</li>
<li>
<p><code v-pre>callbacks</code>：回调函数，用于早停</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF"> trainer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> Trainer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            model</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">model,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            tokenizer</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            args</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">training_args,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            train_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">train_dataset,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            eval_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">eval_dataset,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            data_collator</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">data_collator,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            callbacks</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">[</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF">EarlyStoppingCallback</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"patience"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">])]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
<li>
<p><code v-pre>TrainingArguments</code></p>
<ul>
<li>
<p>控制训练过程的超参数和基础设施配置</p>
<ul>
<li>
<p><code v-pre>output_dir</code>：输出目录</p>
</li>
<li>
<p><code v-pre>learning_rate</code>：初始学习率</p>
</li>
<li>
<p><code v-pre>num_train_epochs</code>：训练轮次</p>
</li>
<li>
<p><code v-pre>weight_decay</code>：权重衰减，L2正则化</p>
</li>
<li>
<p><code v-pre>per_device_train_batch_size</code>：训练的时候每个设备处理的批次大小，占用显存</p>
</li>
<li>
<p><code v-pre>per_device_eval_batch_size</code>：推理的时候每个设备处理的批次大小，不占用显存</p>
</li>
<li>
<p><code v-pre>eval_strategy</code>：模型评估策略</p>
</li>
<li>
<p><code v-pre>save_strategy</code>：模型保存策略</p>
</li>
<li>
<p><code v-pre>eval_steps</code>：每N步评估一次</p>
</li>
<li>
<p><code v-pre>save_steps</code>：每N步保存一次</p>
</li>
<li>
<p><code v-pre>logging_steps</code>：每N步记录日志</p>
</li>
<li>
<p><code v-pre>logging_dir</code>：TensorBoard日志目录</p>
</li>
<li>
<p><code v-pre>report_to</code>：日志上报平台</p>
</li>
<li>
<p><code v-pre>fp16</code>：是否启用混合精度训练</p>
</li>
<li>
<p><code v-pre>gradient_accumulation_steps</code>：梯度累积步数，用时间换空间策略</p>
</li>
<li>
<p><code v-pre>gradient_checkpointing</code>：是否开启梯度检查点，开启的话可以节省显存，因为<strong>正向传播的时候系统不会暂存中间值</strong>，而是重新计算</p>
</li>
<li>
<p><code v-pre>max_grad_norm</code>：梯度裁剪，防止梯度爆炸</p>
</li>
<li>
<p><code v-pre>load_best_model_at_end</code>：最佳模型自动保存</p>
<ul>
<li>启用自动保存后，保存模型的步数要是评估步数的倍数，要保证每次评估之后都能保存，而不是评估到一半保存</li>
</ul>
</li>
<li>
<p><code v-pre>lr_scheduler_type</code>：学习率调度器</p>
<ul>
<li><code v-pre>cosine</code>：余弦退火</li>
<li><code v-pre>linear</code>：线性衰减</li>
</ul>
</li>
<li>
<p><code v-pre>metric_for_best_model</code>：</p>
</li>
</ul>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">       training_args </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> TrainingArguments</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            output_dir</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"model"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"output_path"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            learning_rate</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"learning_rate"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            num_train_epochs</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"num_epochs"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            weight_decay</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"weight_decay"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            per_device_train_batch_size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"per_device_train_batch_size"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            per_device_eval_batch_size</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"per_device_eval_batch_size"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            eval_strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"eval_strategy"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            save_strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"save_strategy"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            eval_steps</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"eval_steps"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            save_steps</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"save_steps"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            logging_steps</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"logging_steps"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            logging_dir</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"logging_dir"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            report_to</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"report_to"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            load_best_model_at_end</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"load_best_model_at_end"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            fp16</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"fp16"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            gradient_accumulation_steps</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"training"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"gradient_accumulation_steps"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            dataloader_num_workers</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66">4</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,  </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic"># 增加数据加载器的工作进程</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>datasets.Dataset</code> 是 Hugging Face <code v-pre>datasets</code> 库中的核心类，用于高效处理大规模数据集</p>
<ul>
<li><code v-pre>.from_dict()</code>：用于快速构建数据集，返回的是字典</li>
<li><code v-pre>.map()</code>：对数据集中的每一行或批次应用自定义函数
<ul>
<li><code v-pre>function</code>：函数名</li>
<li><code v-pre>batched</code>：是否批次处理</li>
<li><code v-pre>batch_size</code>：每批次的样本数</li>
<li><code v-pre>num_proc</code>：使用的进程数</li>
</ul>
</li>
<li><code v-pre>.save_to_disk</code>：存储Dataset格式的数据集</li>
</ul>
</li>
<li>
<p><code v-pre>load_dataset</code>：是<code v-pre>datasets</code>中一个加载数据集的方法</p>
<ul>
<li>
<p><code v-pre>split</code>：用于指定加载数据集的哪个子集，可以指定加载百分之多少，使用切片语法</p>
</li>
<li>
<p><code v-pre>streaming</code>：是否启用流式加载，避免OOM，不会一次性把数据集读入内存，仅受磁盘空间限制</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B"> self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.dataset </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> load_dataset</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"BelleGroup/multiturn_chat_0.8M"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">, </span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">split</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"train[:70%]"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">,</span><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">streaming</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">true)</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><code v-pre>DataCollatorForSeq2Seq</code>：用于动态批处理输入数据，并自动处理填充、注意力掩码和标签对齐</p>
<ul>
<li>
<p><code v-pre>tokenizer</code>：分词器</p>
</li>
<li>
<p><code v-pre>model</code>：模型，可用于自动推断解码器结构</p>
</li>
<li>
<p><code v-pre>padding</code>：填充策略</p>
</li>
<li>
<p><code v-pre>max_length</code>：文本最长的长度</p>
</li>
<li>
<p><code v-pre>pad_to_multiple_of</code>：将长度填充到该值的倍数</p>
</li>
<li>
<p><code v-pre>label_pad_token_id</code>：标签序列的填充 Token ID</p>
</li>
<li>
<p><code v-pre>return_tensors</code>：返回的张量格式</p>
<div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34"><pre class="shiki shiki-themes one-light one-dark-pro vp-code" v-pre=""><code class="language-python"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">data_collator </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF"> DataCollatorForSeq2Seq</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">(</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            tokenizer</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B">self</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">.tokenizer,</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            pad_to_multiple_of</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"dataloader"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"pad_to_multiple_of"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            return_tensors</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"dataloader"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"return_tensors"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            padding</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"dataloader"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"padding"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">],</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic">            label_pad_token_id</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">config[</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"dataloader"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">][</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379">"label_pad_token_id"</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF">        )</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</div></template>


