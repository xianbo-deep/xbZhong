import comp from "E:/Myown/Blog/.temp/pages/coding/sklearn.html.vue"
const data = JSON.parse("{\"path\":\"/coding/sklearn.html\",\"title\":\"决策树\",\"lang\":\"zh-CN\",\"frontmatter\":{\"timeline\":false,\"article\":false,\"description\":\"本页PDF 决策树 可以不用做太多的数据预处理\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"决策树\\\",\\\"description\\\":\\\"本页PDF 决策树 可以不用做太多的数据预处理\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/coding/sklearn.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"决策树\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 决策树 可以不用做太多的数据预处理\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.08,\"words\":24},\"filePathRelative\":\"coding/sklearn.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/coding/sklearn.pdf\\\">本页PDF</a></p>\\n<h1>决策树</h1>\\n<p><strong>可以不用做太多的数据预处理</strong></p>\\n\",\"autoDesc\":true}")
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
