import comp from "E:/Myown/Blog/.temp/pages/dl/primer/GenerativeModels.html.vue"
const data = JSON.parse("{\"path\":\"/dl/primer/GenerativeModels.html\",\"title\":\"常见的生成式模型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"常见的生成式模型\",\"description\":\"蛮多都过时了，可以了解\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"primer\",\"timeline\":true,\"icon\":\"oui:generate\",\"date\":\"2024-06-18T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"常见的生成式模型\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-06-18T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/primer/GenerativeModels.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"常见的生成式模型\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"蛮多都过时了，可以了解\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-06-18T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":1.24,\"words\":371},\"filePathRelative\":\"dl/primer/GenerativeModels.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/primer/GenerativeModels.pdf\\\">本页PDF</a></p>\\n<h2>PixelRNN</h2>\\n<ul>\\n<li>\\n<p>随机给一个像素，给予模型<strong>random</strong>值</p>\\n</li>\\n<li>\\n<p>本质上是根据已生成的结果生成新的输出，会考虑<strong>当前时间点</strong>之前的<strong>所有</strong>输出</p>\\n</li>\\n<li>\\n<p>一个像素一个像素生成</p>\\n</li>\\n</ul>\\n<h2>Generative Adversarial Network（GAN 生成对抗网络）</h2>\"}")
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
