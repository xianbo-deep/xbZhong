import comp from "E:/Myown/Blog/.temp/pages/coding/bootstrap.html.vue"
const data = JSON.parse("{\"path\":\"/coding/bootstrap.html\",\"title\":\"BootStrap\",\"lang\":\"zh-CN\",\"frontmatter\":{\"timeline\":false,\"article\":false,\"description\":\"本页PDF BootStrap 别人已经写好的CSS样式，要使用则需要下载，并且还需要按照bootstrap的规定来编写 开发版本：bootstrap.css 生产版本：bootstrap.min.css\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"BootStrap\\\",\\\"description\\\":\\\"本页PDF BootStrap 别人已经写好的CSS样式，要使用则需要下载，并且还需要按照bootstrap的规定来编写 开发版本：bootstrap.css 生产版本：bootstrap.min.css\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/coding/bootstrap.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"BootStrap\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF BootStrap 别人已经写好的CSS样式，要使用则需要下载，并且还需要按照bootstrap的规定来编写 开发版本：bootstrap.css 生产版本：bootstrap.min.css\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.17,\"words\":51},\"filePathRelative\":\"coding/bootstrap.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/coding/bootstrap.pdf\\\">本页PDF</a></p>\\n<h1>BootStrap</h1>\\n<p>别人已经写好的CSS样式，要使用则需要下载，并且还需要按照bootstrap的规定来编写</p>\\n<ul>\\n<li>开发版本：bootstrap.css</li>\\n<li>生产版本：bootstrap.min.css</li>\\n</ul>\\n\",\"autoDesc\":true}")
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
