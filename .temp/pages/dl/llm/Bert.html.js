import comp from "E:/Myown/Blog/.temp/pages/dl/llm/Bert.html.vue"
const data = JSON.parse("{\"path\":\"/dl/llm/Bert.html\",\"title\":\"Bert\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Bert\",\"description\":\"LLM开山鼻祖\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"llm\",\"timeline\":true,\"icon\":\"carbon:model\",\"date\":\"2025-07-29T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Bert\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2025-07-29T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/llm/Bert.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Bert\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"LLM开山鼻祖\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-07-29T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":2.61,\"words\":784},\"filePathRelative\":\"dl/llm/Bert.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/llm/Bert.pdf\\\">本页PDF</a></p>\\n<h2>Bert</h2>\\n<p><strong>架构</strong></p>\\n<p>基于EMLO与GPT改进，融合了这两个模型的特征：</p>\\n<ul>\\n<li>EMLO使用的是<strong>双向的RNN</strong></li>\\n<li>GPT使用的是<strong>transformer</strong></li>\\n</ul>\\n<p>而Bert使用的是<strong>双向transformer</strong></p>\\n<p><strong>两步工作</strong></p>\\n<ol>\\n<li>无监督学习的预训练\\n<ul>\\n<li>使用大量无标记的文本进行预训练，也就是文字填空和NSP，使得模型学习到词元的特征和句子之间的关系</li>\\n</ul>\\n</li>\\n<li>有监督学习的微调\\n<ul>\\n<li>使用有标记的文本进行微调，目的是为了让模型适应下游任务，<strong>原始论文采用全参微调</strong></li>\\n<li>微调会保留Bert的预训练权重，但在任务数据上继续训练，并加上<strong>适应该任务的头部层</strong></li>\\n</ul>\\n</li>\\n</ol>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
