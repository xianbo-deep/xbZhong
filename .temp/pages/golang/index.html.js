import comp from "E:/Myown/Blog/.temp/pages/golang/index.html.vue"
const data = JSON.parse("{\"path\":\"/golang/\",\"title\":\"Golang\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Golang\",\"index\":false,\"icon\":\"devicon-plain:go\",\"article\":false,\"timeline\":false,\"date\":\"2025-12-17T00:00:00.000Z\",\"description\":\"好好学\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Golang\\\",\\\"description\\\":\\\"好好学\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/golang/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Golang\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"好好学\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-12-17T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":0.06,\"words\":19},\"filePathRelative\":\"golang/README.md\",\"excerpt\":\"<p>好好学</p>\\n\",\"autoDesc\":true}")
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
