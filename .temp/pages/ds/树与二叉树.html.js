import comp from "E:/Myown/Blog/.temp/pages/ds/树与二叉树.html.vue"
const data = JSON.parse("{\"path\":\"/ds/%E6%A0%91%E4%B8%8E%E4%BA%8C%E5%8F%89%E6%A0%91.html\",\"title\":\"树\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"树\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"ds\",\"timeline\":true,\"description\":\"本页PDF 树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"树\\\",\\\"description\\\":\\\"本页PDF 树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节...\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/ds/%E6%A0%91%E4%B8%8E%E4%BA%8C%E5%8F%89%E6%A0%91.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"树\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 树 树的节点代表集合，树的边代表关系 广度优先遍历 也叫做层序遍历，一层一层来遍历树 使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点 深度优先遍历 使用栈来实现遍历 先左后右 判断栈顶元素是否有子节点，有子节点则入栈，无子节点则出栈，直到变为空栈 二叉树性质 度为0的节点比度为2的节点多一个 种类 完全二叉树：只有最后一层缺少右侧节...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/ds/image-21.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}]]},\"readingTime\":{\"minutes\":10.55,\"words\":3164},\"filePathRelative\":\"ds/树与二叉树.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/ds/%E6%A0%91%E4%B8%8E%E4%BA%8C%E5%8F%89%E6%A0%91.pdf\\\">本页PDF</a></p>\\n<h2>树</h2>\\n<p><strong>树的节点代表集合，树的边代表关系</strong></p>\\n<h3>广度优先遍历</h3>\\n<ul>\\n<li>\\n<p>也叫做层序遍历，一层一层来遍历树</p>\\n</li>\\n<li>\\n<p>使用队列来进行遍历，遍历完当前节点的子节点就弹出该节点</p>\\n<pre><code>  void bfs(Node *root) //广度优先遍历\\n  {\\n      head = tail = 0;\\n      Queue[tail++] = root;\\n      while(head&lt;tail)\\n      {\\n          Node *node = Queue[head];\\n          cout &lt;&lt; node-&gt;key &lt;&lt; endl;\\n          if(node-&gt;lchild) Queue[tail++] = node-&gt;lchild;\\n          if(node-&gt;rchild) Queue[tail++] = node-&gt;rchild;\\n          head++;\\n      }\\n      return;\\n  }\\n</code></pre>\\n</li>\\n</ul>\",\"autoDesc\":true}")
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
