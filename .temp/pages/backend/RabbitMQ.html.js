import comp from "E:/Myown/Blog/.temp/pages/backend/RabbitMQ.html.vue"
const data = JSON.parse("{\"path\":\"/backend/RabbitMQ.html\",\"title\":\"RabbitMQ\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"RabbitMQ\",\"description\":\"消息队列\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"backend\",\"timeline\":true,\"icon\":\"devicon:rabbitmq\",\"date\":\"2025-10-06T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"RabbitMQ\\\",\\\"description\\\":\\\"消息队列\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/backend/RabbitMQ.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"RabbitMQ\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"消息队列\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/backend/image-20251004143308203.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-10-06T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":13.06,\"words\":3918},\"filePathRelative\":\"backend/RabbitMQ.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/backend/RabbitMQ.pdf\\\">本页PDF</a></p>\\n<h2>RabbitMQ</h2>\\n<p>是一种消息队列，负责在不同的服务之间传递消息</p>\\n<p><strong>核心作用：​​​​</strong>解耦、异步、削峰填谷、可靠消息传递</p>\\n<h3>同步调用</h3>\\n<p>整个流程是<strong>顺序执行</strong>的，一步接一步，必须等前一步完成才能开始下一步</p>\\n<p><strong>优势：​​​​</strong></p>\\n<ul>\\n<li>时效性强，等待到结果才返回</li>\\n</ul>\\n<p><strong>问题：​​​​</strong></p>\"}")
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
