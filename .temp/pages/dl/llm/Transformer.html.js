import comp from "E:/Myown/Blog/.temp/pages/dl/llm/Transformer.html.vue"
const data = JSON.parse("{\"path\":\"/dl/llm/Transformer.html\",\"title\":\"Transformer\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Transformer\",\"description\":\"变形金刚\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"llm\",\"timeline\":true,\"icon\":\"roentgen:transformer\",\"date\":\"2025-06-28T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Transformer\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250702225431058.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250427121123206.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250510194255934.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250418130432286.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250420112828589.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250702191639250.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250701224305593.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250702192315616.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250702191639250.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250702191137599.png\\\"],\\\"datePublished\\\":\\\"2025-06-28T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/llm/Transformer.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Transformer\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"变形金刚\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250702225431058.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-06-28T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":19.12,\"words\":5737},\"filePathRelative\":\"dl/llm/Transformer.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/llm/Transformer.pdf\\\">本页PDF</a></p>\\n<h2>Transformer</h2>\\n<p>是<strong>Sequence to Sequence Model</strong>的一种</p>\\n<p>编码器解码器架构作用：<strong>让编码器全面理解输入序列的语义，并将其压缩为高阶表示（Context），解码器则基于此上下文信息，逐步生成目标序列</strong></p>\\n<h3><strong>输入部分细节</strong></h3>\\n<ol>\\n<li><strong>Word Embedding（词向量嵌入）</strong></li>\\n</ol>\"}")
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
