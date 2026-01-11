import comp from "E:/Myown/Blog/.temp/pages/dl/notes/Production.html.vue"
const data = JSON.parse("{\"path\":\"/dl/notes/Production.html\",\"title\":\"Linux常见命令\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Linux常见命令\",\"description\":\"记录一些常用linux命令和学到的知识\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"notes\",\"timeline\":true,\"icon\":\"devicon:linux\",\"date\":\"2025-08-26T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Linux常见命令\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2025-08-26T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/notes/Production.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Linux常见命令\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"记录一些常用linux命令和学到的知识\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-08-26T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":3.98,\"words\":1195},\"filePathRelative\":\"dl/notes/Production.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/notes/Production.pdf\\\">本页PDF</a></p>\\n<p><strong>阿里云镜像</strong>：<code>-i https://mirrors.aliyun.com/pypi/simple/</code></p>\\n<p><code>nvidia-smi</code>：针对N卡，查看GPU型号，显存使用情况，使用率等</p>\\n<p><code>lscpu</code>：查看cpu的信息</p>\\n<ul>\\n<li><code>P-core</code>：性能核心（支持超线程，可以虚拟化为2个核心）</li>\\n<li><code>E-core</code>：能效核心（不支持超线程）</li>\\n</ul>\"}")
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
