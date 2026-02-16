import comp from "E:/Myown/Blog/.temp/pages/aboutblog/logs.html.vue"
const data = JSON.parse("{\"path\":\"/aboutblog/logs.html\",\"title\":\"开发日志\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"开发日志\",\"index\":false,\"article\":false,\"timeline\":false,\"date\":\"2025-02-16T00:00:00.000Z\",\"description\":\"第一次决定开始写开发日志，之前捣鼓后端的时候还没有写这个日志得想法，现在想想总觉得有必要，可以复盘，告诉自己学了什么，还有什么不会，还是非常有用的 2026.01.23 昨天看了一下接口延迟，不知道是什么原因，服务器在上海，平均下来每个接口延迟超过了100ms，去看了一下调用流程，发现每次请求接口前都会发送一个预检请求，查了一下才知道是跨域的时候才会出...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"开发日志\\\",\\\"description\\\":\\\"第一次决定开始写开发日志，之前捣鼓后端的时候还没有写这个日志得想法，现在想想总觉得有必要，可以复盘，告诉自己学了什么，还有什么不会，还是非常有用的 2026.01.23 昨天看了一下接口延迟，不知道是什么原因，服务器在上海，平均下来每个接口延迟超过了100ms，去看了一下调用流程，发现每次请求接口前都会发送一个预检请求，查了一下才知道是跨域的时候才会出...\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/aboutblog/logs.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"开发日志\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"第一次决定开始写开发日志，之前捣鼓后端的时候还没有写这个日志得想法，现在想想总觉得有必要，可以复盘，告诉自己学了什么，还有什么不会，还是非常有用的 2026.01.23 昨天看了一下接口延迟，不知道是什么原因，服务器在上海，平均下来每个接口延迟超过了100ms，去看了一下调用流程，发现每次请求接口前都会发送一个预检请求，查了一下才知道是跨域的时候才会出...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-02-16T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":6.95,\"words\":2086},\"filePathRelative\":\"aboutblog/logs.md\",\"excerpt\":\"<p>第一次决定开始写开发日志，之前捣鼓后端的时候还没有写这个日志得想法，现在想想总觉得有必要，可以复盘，告诉自己学了什么，还有什么不会，还是非常有用的</p>\\n<h2>2026.01.23</h2>\\n<p>昨天看了一下接口延迟，不知道是什么原因，服务器在上海，平均下来每个接口延迟超过了100ms，去看了一下调用流程，发现每次请求接口前都会发送一个<strong>预检请求</strong>，查了一下才知道是跨域的时候才会出现，可能是我没加预检缓存导致接口返回缓慢</p>\\n<p>昨天还发现一个问题，慢查询现象比较严重，不知道gorm算的时间有没有包括建立连接这段时间，毕竟放数据库的服务器在新加坡，后续得<strong>排查一下慢查询，还有就是得给日志表分区，然后优化一下索引</strong></p>\",\"autoDesc\":true}")
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
