import comp from "E:/Myown/Blog/.temp/pages/resource/data/4.html.vue"
const data = JSON.parse("{\"path\":\"/resource/data/4.html\",\"title\":\"大四\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"大四\",\"index\":false,\"article\":false,\"timeline\":false,\"description\":\"本页PDF 大四上 大四下\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"大四\\\",\\\"description\\\":\\\"本页PDF 大四上 大四下\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/resource/data/4.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"大四\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 大四上 大四下\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.06,\"words\":19},\"filePathRelative\":\"resource/data/4.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/resource/data/4.pdf\\\">本页PDF</a></p>\\n<h2>大四上</h2>\\n<h2>大四下</h2>\\n\",\"autoDesc\":true}")
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
