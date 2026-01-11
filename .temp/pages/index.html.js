import comp from "E:/Myown/Blog/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"主页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"layout\":\"Blog\",\"icon\":\"house\",\"title\":\"主页\",\"heroText\":\"朝花夕拾\",\"bgImage\":\"/bg.jpg\",\"heroFullScreen\":true,\"heroImageStyle\":{\"width\":\"150px\",\"height\":\"150px\"},\"projects\":[{\"icon\":\"folder-open\",\"name\":\"常见卷积神经网络的实现\",\"desc\":\"源代码都在这\",\"link\":\"https://github.com/xianbo-deep/Model\"}],\"description\":\"博客 建议使用PC端进行浏览，移动端的话观感一般，且响应式布局会把该有的组件放到意想不到的地方，挺折磨人 刚搭建没多久，大家有什么建议可以在评论区进行回复\",\"head\":[[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"WebPage\\\",\\\"name\\\":\\\"主页\\\",\\\"description\\\":\\\"博客 建议使用PC端进行浏览，移动端的话观感一般，且响应式布局会把该有的组件放到意想不到的地方，挺折磨人 刚搭建没多久，大家有什么建议可以在评论区进行回复\\\"}\"],[\"meta\",{\"property\":\"og:url\",\"content\":\"https://xbzhong.cn/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"阿b的博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"主页\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"博客 建议使用PC端进行浏览，移动端的话观感一般，且响应式布局会把该有的组件放到意想不到的地方，挺折磨人 刚搭建没多久，大家有什么建议可以在评论区进行回复\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"website\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}]]},\"readingTime\":{\"minutes\":0.5,\"words\":149},\"filePathRelative\":\"README.md\",\"excerpt\":\"<h2>博客</h2>\\n<p>建议使用<strong>PC端</strong>进行浏览，移动端的话观感一般，且响应式布局会把该有的组件放到意想不到的地方，挺折磨人</p>\\n<p>刚搭建没多久，大家有什么建议可以在评论区进行回复</p>\\n\",\"autoDesc\":true}")
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
