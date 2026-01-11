import comp from "E:/Myown/Blog/.temp/pages/backend/Lock.html.vue"
const data = JSON.parse("{\"path\":\"/backend/Lock.html\",\"title\":\"常见锁\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"常见锁\",\"description\":\"并发编程前置知识吧，就是对一些常见锁做了概念上的阐述\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"backend\",\"timeline\":true,\"icon\":\"material-symbols:lock-outline\",\"date\":\"2025-09-02T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"常见锁\\\",\\\"description\\\":\\\"并发编程前置知识吧，就是对一些常见锁做了概念上的阐述\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/backend/Lock.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"常见锁\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"并发编程前置知识吧，就是对一些常见锁做了概念上的阐述\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-09-02T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":7.11,\"words\":2132},\"filePathRelative\":\"backend/Lock.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/backend/Lock.pdf\\\">本页PDF</a></p>\\n<h2>悲观锁</h2>\\n<p>悲观锁认为自己在使用数据的时候<strong>一定会有别的线程来修改数据</strong>，因此在获取数据的时候会先加锁，确保数据不会被其他线程修改</p>\\n<ul>\\n<li><strong><code>synchronized</code>和<code>Lock</code>接口的实现类都是悲观锁</strong></li>\\n</ul>\\n<h2>乐观锁</h2>\\n<p>乐观锁认为自己在使用数据的时候<strong>不会有别的线程修改数据</strong>，所以不会添加锁</p>\"}")
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
