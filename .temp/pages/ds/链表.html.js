import comp from "E:/Myown/Blog/.temp/pages/ds/链表.html.vue"
const data = JSON.parse("{\"path\":\"/ds/%E9%93%BE%E8%A1%A8.html\",\"title\":\"链表常见题目\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"链表常见题目\",\"author\":\"xbZhong\",\"isOriginal\":true,\"article\":false,\"category\":\"ds\",\"timeline\":true,\"icon\":\"mingcute:code-line\",\"description\":\"本页PDF 反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因...\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"链表常见题目\\\",\\\"description\\\":\\\"本页PDF 反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因...\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/ds/%E9%93%BE%E8%A1%A8.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"链表常见题目\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"本页PDF 反转链表 alt textalt text 反转链表迭代做法 通过创建一个新的节点prev，将旧链表从前往后遍历 反转链表头插法做法 反转链表递归做法 判断环形链表 快慢指针法 用两个指针来判断 一个指针跑得快，一个指针跑得慢 若不是环形结构，跑的慢的永远追不上跑得快的，因此一定会返回false 若是环形结构，跑得慢的一定会遇到跑得快的，因...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:image\",\"content\":\"https://xbzhong.cn/screenshot/ds/image-6.png\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"xbZhong\"}]]},\"readingTime\":{\"minutes\":4.42,\"words\":1326},\"filePathRelative\":\"ds/链表.md\",\"excerpt\":\"<p><a href=\\\"/pdfs/ds/%E9%93%BE%E8%A1%A8.pdf\\\">本页PDF</a></p>\\n<h2>反转链表</h2>\\n<figure><img src=\\\"/screenshot/ds/image-6.png\\\" alt=\\\"alt text\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption>alt text</figcaption></figure>\\n<h3>反转链表迭代做法</h3>\\n<p><strong>通过创建一个新的节点prev，将旧链表从前往后遍历</strong></p>\\n<pre><code>class Solution {\\npublic:\\n    ListNode* reverseList(ListNode* head) {\\n    ListNode *prev=NULL,*temp = head;\\n    while(temp)\\n    {\\n        ListNode *next = temp-&gt;next;\\n        temp-&gt;next = prev;\\n        prev = temp ;\\n        temp = next;\\n    }\\n    return prev;\\n    }\\n};\\n</code></pre>\",\"autoDesc\":true}")
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
