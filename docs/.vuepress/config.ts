import { defineUserConfig } from "vuepress";
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics';
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "阿b的博客",
  description: "钻之弥坚",
  
  theme,
  plugins: [
    baiduAnalyticsPlugin({
      id: "034eb278592c89e6b93ebddedac1d7e4"
    })
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  head: [
    // ...

    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap",
        rel: "stylesheet",
      },
    ],
  ],
  
});


// import docsearch from '@docsearch/js';
// import '@docsearch/css';

// docsearch({
//   container: '#docsearch',
//   appId: 'V6D69KWM6B',
//   indexName: 'xbzhong',
//   apiKey: 'ee72c5f2d49ddc0fe1780cbe43b1db89',
//   askAi: 'YOUR_ALGOLIA_ASSISTANT_ID', // TODO: Replace with your Algolia Assistant ID
// });