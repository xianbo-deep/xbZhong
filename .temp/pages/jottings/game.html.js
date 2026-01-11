import comp from "E:/Myown/Blog/.temp/pages/jottings/game.html.vue"
const data = JSON.parse("{\"path\":\"/jottings/game.html\",\"title\":\"Game\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Game\",\"index\":false,\"article\":false,\"timeline\":false,\"date\":\"2025-11-17T00:00:00.000Z\",\"description\":\"350h的奖励\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Game\\\",\\\"description\\\":\\\"350h的奖励\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/jottings/game.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Game\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"350h的奖励\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/game/1.jpg\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-11-17T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":0.06,\"words\":17},\"filePathRelative\":\"jottings/game.md\",\"excerpt\":\"<h2>350h的奖励</h2>\\n<figure><img src=\\\"/game/1.jpg\\\" alt=\\\"\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption></figcaption></figure>\\n\",\"autoDesc\":true}")
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
