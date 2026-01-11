import comp from "E:/Myown/Blog/.temp/pages/category/ds/index.html.vue"
const data = JSON.parse("{\"path\":\"/category/ds/\",\"title\":\"ds 分类\",\"lang\":\"zh-CN\",\"frontmatter\":{\"dir\":{\"index\":false},\"index\":false,\"feed\":false,\"sitemap\":false,\"title\":\"ds 分类\",\"blog\":{\"type\":\"category\",\"name\":\"ds\",\"key\":\"category\"},\"layout\":\"Blog\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"ds 分类\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/category/ds/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"ds 分类\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"excerpt\":\"\"}")
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
