import comp from "E:/Myown/Blog/.temp/pages/resource/data/index.html.vue"
const data = JSON.parse("{\"path\":\"/resource/data/\",\"title\":\"前言\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"前言\",\"index\":false,\"article\":false,\"timeline\":false,\"description\":\"放置一些基础课、专业课的课程资料，PPT，电子书等\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"前言\\\",\\\"description\\\":\\\"放置一些基础课、专业课的课程资料，PPT，电子书等\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/resource/data/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"前言\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"放置一些基础课、专业课的课程资料，PPT，电子书等\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.1,\"words\":29},\"filePathRelative\":\"resource/data/README.md\",\"excerpt\":\"<p>放置一些基础课、专业课的课程资料，PPT，电子书等</p>\\n\",\"autoDesc\":true}")
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
