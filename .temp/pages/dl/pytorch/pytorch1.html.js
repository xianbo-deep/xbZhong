import comp from "E:/Myown/Blog/.temp/pages/dl/pytorch/pytorch1.html.vue"
const data = JSON.parse("{\"path\":\"/dl/pytorch/pytorch1.html\",\"title\":\"pytorch\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"pytorch\",\"description\":\"对第一次的笔记做了总结，不太适合0基础的看\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"pytorch\",\"timeline\":true,\"icon\":\"material-icon-theme:pytorch\",\"date\":\"2025-08-18T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"pytorch\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250805130358084.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250805130421265.png\\\"],\\\"datePublished\\\":\\\"2025-08-18T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/pytorch/pytorch1.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"pytorch\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"对第一次的笔记做了总结，不太适合0基础的看\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250805130358084.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-08-18T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":15.78,\"words\":4734},\"filePathRelative\":\"dl/pytorch/pytorch1.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/pytorch/pytorch1.pdf\\\">本页PDF</a></p>\\n<h2>Pytorch</h2>\\n<p><strong>pytorch</strong>与<strong>tensorflow</strong>的区别：</p>\\n<p>pytorch支持动态计算图</p>\\n<ul>\\n<li>计算图在代码运行时动态生成</li>\\n<li>可根据运行逻辑实时更改计算图</li>\\n</ul>\\n<p>tensorflow支持静态计算图</p>\\n<ul>\\n<li>先定义后执行</li>\\n<li>计算图在编译后无法再修改</li>\\n</ul>\\n<h3>datasets</h3>\"}")
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
