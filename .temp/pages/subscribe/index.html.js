import comp from "E:/Myown/Blog/.temp/pages/subscribe/index.html.vue"
const data = JSON.parse("{\"path\":\"/subscribe/\",\"title\":\"订阅更新\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"订阅更新\",\"icon\":\"envelope\",\"sidebar\":false,\"article\":false,\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"订阅更新\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/subscribe/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"订阅更新\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.06,\"words\":19},\"filePathRelative\":\"subscribe/README.md\",\"excerpt\":\"<div style=\\\"margin-top: 50px;\\\"></div>\\n\"}")
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
