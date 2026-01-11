import comp from "E:/Myown/Blog/.temp/pages/dl/cv/DiffusionModel.html.vue"
const data = JSON.parse("{\"path\":\"/dl/cv/DiffusionModel.html\",\"title\":\"扩散模型\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"扩散模型\",\"description\":\"很难，建议看视频理解，有非常多的数学推导，目前还没学完\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"cv\",\"timeline\":true,\"icon\":\"tabler:math\",\"date\":\"2025-07-08T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"扩散模型\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250510233616851.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250511132150467.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250511112847361.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250511111842681.png\\\"],\\\"datePublished\\\":\\\"2025-07-08T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/cv/DiffusionModel.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"扩散模型\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"很难，建议看视频理解，有非常多的数学推导，目前还没学完\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250510233616851.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-07-08T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":12.06,\"words\":3619},\"filePathRelative\":\"dl/cv/DiffusionModel.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/cv/DiffusionModel.pdf\\\">本页PDF</a></p>\\n<h2>完全理解数学推导非常难！！！</h2>\\n<h2>Diffusion probabilistic Model（扩散概率模型）</h2>\\n<h3>工作流程</h3>\\n<ol>\\n<li>从高维正态分布采样，维度与生成图片的维度大小相同</li>\\n<li>模型对采样后的数据去除噪声，会连续经过<strong>去噪模型</strong>（次数事先定好），最后把噪声通通滤掉，得到图片\\n<ul>\\n<li>Denoise模型除了会接受图片作为输入，还会接受一个数字作为参数，这个数字表示当前图片受噪声影响严重的程度，客观上反映了进行到哪个step</li>\\n<li>Denoise模型内部的<strong>Noise Predicter</strong>对图片噪声进行预测，得到噪声图片，然后用原图片减去噪声图片得到更加清晰的图片</li>\\n</ul>\\n</li>\\n</ol>\"}")
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
