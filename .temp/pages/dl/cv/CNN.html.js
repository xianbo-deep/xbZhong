import comp from "E:/Myown/Blog/.temp/pages/dl/cv/CNN.html.vue"
const data = JSON.parse("{\"path\":\"/dl/cv/CNN.html\",\"title\":\"卷积神经网络\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"卷积神经网络\",\"description\":\"讲的比较抽象，最好结合视频理解\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"cv\",\"timeline\":true,\"icon\":\"lucide:network\",\"date\":\"2024-06-01T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"卷积神经网络\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250417180348074.png\\\"],\\\"datePublished\\\":\\\"2024-06-01T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/cv/CNN.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"卷积神经网络\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"讲的比较抽象，最好结合视频理解\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250417180348074.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-06-01T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":3.07,\"words\":922},\"filePathRelative\":\"dl/cv/CNN.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/cv/CNN.pdf\\\">本页PDF</a></p>\\n<h2>Convolutional Neutral Network（卷积神经网络）</h2>\\n<p><strong>局部连接</strong>：</p>\\n<p>CNN 不是每个神经元都连全图（像 MLP 那样），而是只看<strong>小块区域</strong>（比如 3×3）</p>\\n<p><strong>权重共享</strong>：</p>\\n<p>整个图上，这个卷积核在每个区域滑动时 <strong>用的都是同一套参数</strong></p>\\n<ul>\\n<li>在<strong>CNN</strong>里面，通常输入的张量维度会很大，在进行识别类别的时候，只需要让每个<strong>Neutral去负责自己的Receptive field</strong>，从而识别特征，<strong>不需要</strong>看整张图片</li>\\n<li><strong>卷积神经网络(CNN)训练的核心就是学习滤波器(filter)中的参数数值</strong></li>\\n</ul>\"}")
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
