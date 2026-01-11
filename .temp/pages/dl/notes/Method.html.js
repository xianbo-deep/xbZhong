import comp from "E:/Myown/Blog/.temp/pages/dl/notes/Method.html.vue"
const data = JSON.parse("{\"path\":\"/dl/notes/Method.html\",\"title\":\"压缩模型的方式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"压缩模型的方式\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"notes\",\"timeline\":true,\"icon\":\"material-symbols:compress\",\"date\":\"2025-06-26T00:00:00.000Z\",\"description\":\"本页PDF 模型压缩三部分优化： 减少内存密集的范围量 提高获取模型参数时间 加速模型推理时间 模型剪枝（Pruning） 研究模型权重的冗余，尝试删除/修改冗余或者非关键权重，会改变模型参数量 image-20250703160937958image-20250703160937958 剪枝算法分类 非结构化剪枝：剪枝算法简单，模型压缩比高，权重矩阵...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"压缩模型的方式\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250703160937958.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250703160948495.png\\\"],\\\"datePublished\\\":\\\"2025-06-26T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/notes/Method.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"压缩模型的方式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 模型压缩三部分优化： 减少内存密集的范围量 提高获取模型参数时间 加速模型推理时间 模型剪枝（Pruning） 研究模型权重的冗余，尝试删除/修改冗余或者非关键权重，会改变模型参数量 image-20250703160937958image-20250703160937958 剪枝算法分类 非结构化剪枝：剪枝算法简单，模型压缩比高，权重矩阵...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250703160937958.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-06-26T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":1.46,\"words\":437},\"filePathRelative\":\"dl/notes/Method.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/notes/Method.pdf\\\">本页PDF</a></p>\\n<p><strong>模型压缩三部分优化</strong>：</p>\\n<ol>\\n<li>减少内存密集的范围量</li>\\n<li>提高获取模型参数时间</li>\\n<li>加速模型推理时间</li>\\n</ol>\\n<h2>模型剪枝（Pruning）</h2>\\n<p>研究模型权重的冗余，尝试<strong>删除/修改</strong>冗余或者非关键权重，会<strong>改变模型参数量</strong></p>\\n<figure><img src=\\\"/screenshot/dl/image-20250703160937958.png\\\" alt=\\\"image-20250703160937958\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption>image-20250703160937958</figcaption></figure>\",\"autoDesc\":true}")
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
