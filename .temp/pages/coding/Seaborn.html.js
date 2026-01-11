import comp from "E:/Myown/Blog/.temp/pages/coding/Seaborn.html.vue"
const data = JSON.parse("{\"path\":\"/coding/Seaborn.html\",\"title\":\"Seaborn\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Seaborn\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"code\",\"timeline\":true,\"icon\":\"logos:seaborn\",\"date\":\"2024-04-11T00:00:00.000Z\",\"description\":\"本页PDF 导包 import seaborn as sns 数据集 seaborn内置了多个数据集，可以用sns.load_dataset()来读取 sns.load_dataset(name, cache=True, data_home=None, **kwargs) name: 数据集的名称，字符串类型。例如，可以是 'tips'、'iris'、...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Seaborn\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2024-04-11T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/coding/Seaborn.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Seaborn\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 导包 import seaborn as sns 数据集 seaborn内置了多个数据集，可以用sns.load_dataset()来读取 sns.load_dataset(name, cache=True, data_home=None, **kwargs) name: 数据集的名称，字符串类型。例如，可以是 'tips'、'iris'、...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-04-11T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":2.42,\"words\":726},\"filePathRelative\":\"coding/Seaborn.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/coding/Seaborn.pdf\\\">本页PDF</a></p>\\n<h2>导包</h2>\\n<p><code>import seaborn as sns</code></p>\\n<h2>数据集</h2>\\n<p><strong>seaborn内置了多个数据集，可以用sns.load_dataset()来读取</strong></p>\\n<ul>\\n<li><code>sns.load_dataset(name, cache=True, data_home=None, **kwargs)</code>\\n<ul>\\n<li><strong><code>name</code></strong>: 数据集的名称，字符串类型。例如，可以是 <code>'tips'</code>、<code>'iris'</code>、<code>'flights'</code> 等。</li>\\n<li><strong><code>cache</code></strong>: 布尔值，指定是否将下载的数据集缓存到本地（默认值为 <code>True</code>）。</li>\\n<li><strong><code>data_home</code></strong>: 数据集缓存的位置，默认为 <code>~/.seaborn-data</code>。</li>\\n<li><strong><code>**kwargs</code></strong>: 其他参数，可选，用于传递给数据加载函数。</li>\\n</ul>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
