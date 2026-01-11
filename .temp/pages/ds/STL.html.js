import comp from "E:/Myown/Blog/.temp/pages/ds/STL.html.vue"
const data = JSON.parse("{\"path\":\"/ds/STL.html\",\"title\":\"STL\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"STL\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":true,\"category\":\"ds\",\"timeline\":true,\"icon\":\"hugeicons:cpp\",\"date\":\"2024-05-10T00:00:00.000Z\",\"description\":\"本页PDF 迭代器(可以看作指针) c++里面可以用auto自动识别迭代器类型 不用auto,则需要写完整代码。例如：vector< int > :: iterator it for(auto x: nums)可以利用x来遍历nums，但不能修改值(其不是迭代器，因此输出时直接cout << x即可) x是深拷贝的一份数据 for(auto &x:nu...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"STL\\\",\\\"image\\\":[\\\"https://xbzhong.cn/screenshot/ds/image-43.png\\\"],\\\"datePublished\\\":\\\"2024-05-10T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"xbZhong\\\"}]}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/ds/STL.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"STL\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 迭代器(可以看作指针) c++里面可以用auto自动识别迭代器类型 不用auto,则需要写完整代码。例如：vector< int > :: iterator it for(auto x: nums)可以利用x来遍历nums，但不能修改值(其不是迭代器，因此输出时直接cout << x即可) x是深拷贝的一份数据 for(auto &x:nu...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/ds/image-43.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2024-05-10T00:00:00.000Z\"}]]},\"readingTime\":{\"minutes\":11.12,\"words\":3337},\"filePathRelative\":\"ds/STL.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/ds/STL.pdf\\\">本页PDF</a></p>\\n<h2>迭代器(可以看作指针)</h2>\\n<ul>\\n<li>\\n<p>c++里面可以用auto自动识别迭代器类型</p>\\n</li>\\n<li>\\n<p>不用auto,则需要写完整代码。例如：vector&lt; int &gt; :: iterator it</p>\\n</li>\\n<li>\\n<p>for(auto x: nums)可以利用x来遍历nums，但不能修改值(其不是迭代器，因此输出时直接cout &lt;&lt; x即可)</p>\\n<ul>\\n<li><strong>x是深拷贝的一份数据</strong></li>\\n</ul>\\n</li>\\n<li>\\n<p>for(auto &amp;x:nums)可以利用x来修改容器nums的值</p>\\n<ul>\\n<li><strong>本质上x是指针</strong></li>\\n</ul>\\n</li>\\n<li>\\n<p>迭代器可分为迭代器和常量迭代器(常量迭代器适用于模板为const类型的，即值不可修改)</p>\\n</li>\\n<li>\\n<p>还可分为正向迭代器，反向迭代器，双向迭代器，随机访问迭代器</p>\\n</li>\\n<li>\\n<p>随机访问迭代器只有vector，deque，string有，他们对+=，,&lt;=,&gt;=进行了重载</p>\\n</li>\\n<li>\\n<p>支持双向迭代器的有set，map，list，multiset，multimap</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
