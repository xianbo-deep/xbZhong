import comp from "E:/Myown/Blog/.temp/pages/backend/LangChain4j.html.vue"
const data = JSON.parse("{\"path\":\"/backend/LangChain4j.html\",\"title\":\"Langchain4j\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Langchain4j\",\"description\":\"来不及学，等我补.....\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"backend\",\"timeline\":true,\"icon\":\"simple-icons:langchain\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"Langchain4j\\\",\\\"description\\\":\\\"来不及学，等我补.....\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/backend/LangChain4j.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Langchain4j\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"来不及学，等我补.....\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}]]},\"readingTime\":{\"minutes\":0.1,\"words\":29},\"filePathRelative\":\"backend/LangChain4j.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/backend/LangChain4j.pdf\\\">本页PDF</a></p>\\n\"}")
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
