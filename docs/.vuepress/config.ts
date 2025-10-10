import { defineUserConfig } from "vuepress";
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics';
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "牢钟的博客",
  description: "钻之弥坚",
  
  theme,
  plugins: [
    // baiduAnalyticsPlugin({
    //   // 配置项
    // }),
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
