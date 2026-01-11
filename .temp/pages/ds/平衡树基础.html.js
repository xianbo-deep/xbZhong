import comp from "E:/Myown/Blog/.temp/pages/ds/平衡树基础.html.vue"
const data = JSON.parse("{\"path\":\"/ds/%E5%B9%B3%E8%A1%A1%E6%A0%91%E5%9F%BA%E7%A1%80.html\",\"title\":\"平衡树\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"平衡树\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"ds\",\"timeline\":true,\"icon\":\"mingcute:code-line\",\"description\":\"本页PDF 二叉排序树 对于任意的根节点 左子树的值 < 根节点的值 右子树的值 > 根节点的值 类似中序遍历的遍历方式 ，因此用中序遍历遍历出来一定是有序的 插入 与根节点比较，判断要插入到左子树还是右子树 删除 删除叶子节点 直接删除，让父节点指针指向空地址 删除出度为1的节点 出度为1的节点只有一个子节点 交换子节点和根节点的位置 删除根节点(此...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"平衡树\\\",\\\"description\\\":\\\"本页PDF 二叉排序树 对于任意的根节点 左子树的值 < 根节点的值 右子树的值 > 根节点的值 类似中序遍历的遍历方式 ，因此用中序遍历遍历出来一定是有序的 插入 与根节点比较，判断要插入到左子树还是右子树 删除 删除叶子节点 直接删除，让父节点指针指向空地址 删除出度为1的节点 出度为1的节点只有一个子节点 交换子节点和根节点的位置 删除根节点(此...\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/ds/%E5%B9%B3%E8%A1%A1%E6%A0%91%E5%9F%BA%E7%A1%80.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"平衡树\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 二叉排序树 对于任意的根节点 左子树的值 < 根节点的值 右子树的值 > 根节点的值 类似中序遍历的遍历方式 ，因此用中序遍历遍历出来一定是有序的 插入 与根节点比较，判断要插入到左子树还是右子树 删除 删除叶子节点 直接删除，让父节点指针指向空地址 删除出度为1的节点 出度为1的节点只有一个子节点 交换子节点和根节点的位置 删除根节点(此...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/ds/image-68.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}]]},\"readingTime\":{\"minutes\":5.25,\"words\":1576},\"filePathRelative\":\"ds/平衡树基础.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/ds/%E5%B9%B3%E8%A1%A1%E6%A0%91%E5%9F%BA%E7%A1%80.pdf\\\">本页PDF</a></p>\\n<h2>二叉排序树</h2>\\n<ul>\\n<li>对于任意的根节点\\n<ul>\\n<li>左子树的值 &lt; 根节点的值</li>\\n<li>右子树的值 &gt; 根节点的值</li>\\n</ul>\\n</li>\\n<li>类似中序遍历的遍历方式 ，因此用中序遍历遍历出来一定是有序的</li>\\n</ul>\\n<h3>插入</h3>\\n<p><strong>与根节点比较，判断要插入到左子树还是右子树</strong></p>\\n<h3>删除</h3>\",\"autoDesc\":true}")
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
