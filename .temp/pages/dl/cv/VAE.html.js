import comp from "E:/Myown/Blog/.temp/pages/dl/cv/VAE.html.vue"
const data = JSON.parse("{\"path\":\"/dl/cv/VAE.html\",\"title\":\"变分自编码器\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"变分自编码器\",\"description\":\"比扩散模型简单\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"cv\",\"timeline\":true,\"icon\":\"tabler:math\",\"date\":\"2025-06-20T00:00:00.000Z\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"变分自编码器\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/dl/image-20250430233601234.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250501000147212.png\\\",\\\"https://xbzhong.cn/screenshot/dl/image-20250502115738249.png\\\"],\\\"datePublished\\\":\\\"2025-06-20T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/dl/cv/VAE.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"变分自编码器\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"比扩散模型简单\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/dl/image-20250430233601234.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2025-06-20T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":14.23,\"words\":4269},\"filePathRelative\":\"dl/cv/VAE.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/dl/cv/VAE.pdf\\\">本页PDF</a></p>\\n<h2>VAE（Variational Autoencoder 变分自编码器）</h2>\\n<ul>\\n<li>与 <strong>AE</strong> 结构相似，但是用了特殊技巧使得 <strong>VAE的decoder</strong> 对于一个 <strong>随机的向量</strong> 可以产生结果较好的图</li>\\n</ul>\\n<h3>自编码器(AE)与VAE的对比</h3>\\n<h4>自编码器(AE)的局限性</h4>\\n<ul>\\n<li>自编码器将输入图像压缩为低维潜在向量，然后通过解码器重建图像</li>\\n<li>关键局限：形成的是严格的一对一映射关系\\n<ul>\\n<li>特定输入 → 特定潜在向量 → 特定重建图像</li>\\n</ul>\\n</li>\\n<li>潜在空间不连续，缺乏良好的插值特性</li>\\n<li>无法生成新的、有意义的样本</li>\\n</ul>\"}")
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
