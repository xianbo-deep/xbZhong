import comp from "E:/Myown/Blog/.temp/pages/jottings/music.html.vue"
const data = JSON.parse("{\"path\":\"/jottings/music.html\",\"title\":\"Music\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Music\",\"index\":false,\"article\":false,\"timeline\":false,\"date\":\"2025-10-25T00:00:00.000Z\",\"description\":\"我是小雨，我爱你，你爱我吗\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Music\\\",\\\"description\\\":\\\"我是小雨，我爱你，你爱我吗\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/jottings/music.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Music\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"我是小雨，我爱你，你爱我吗\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-10-25T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":1.06,\"words\":317},\"filePathRelative\":\"jottings/music.md\",\"excerpt\":\"<h2>我是小雨，我爱你，你爱我吗</h2>\\n\",\"autoDesc\":true}")
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
