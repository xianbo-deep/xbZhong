// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss"; // 主页特性闪光效果
import "vuepress-theme-hope/presets/left-blog-info.scss";        // 博客信息左移
import "vuepress-theme-hope/presets/bounce-icon.scss";           // 图标跳动效果
import SubscribeForm from "./components/SubscribeForm.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";


export default defineClientConfig({
  enhance({ app }) {
    app.component("SubscribeForm", SubscribeForm);
  },
  setup() {
    const router = useRouter();

    const getVisitorId = () => {
      const key = "blog_visitor_id";
      try {
        let id = localStorage.getItem(key) || "";
        if (!id) {
          id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
          localStorage.setItem(key, id);
        }
        return id;
      } catch {
        return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
      }
    };

    const ensureVisitorCookie = () => {
      try {
        const vid = getVisitorId();
        document.cookie = `blog_visitor_id=${encodeURIComponent(
          vid
        )}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
      } catch {}
    };

    const readCookie = (name: string) => {
      const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
      return m ? decodeURIComponent(m[1]) : "";
    };

    const clearCookie = (name: string) => {
      document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
    };

    const sendCollect = (path: string, status: number, latency: number) => {
      if (typeof window === "undefined") return;

      const data = {
        visitor_id: getVisitorId(),
        path,
        status,                 //  必填
        timestamp: Date.now(),
        latency,
      };

      fetch("https://api.xbzhong.cn/blog/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(console.error);
    };

    let start = 0;
    let firstReported = false;

    onMounted(() => {
      ensureVisitorCookie();
    });

    router.beforeEach(() => {
      start = performance.now();
    });

    router.afterEach((to, from) => {
      if (typeof window === "undefined") return;
      // ------ 首屏 ------
      if (!firstReported) {
        firstReported = true;

        // 首屏 latency（Navigation Timing v2）
        const nav = performance.getEntriesByType?.("navigation")?.[0] as
          | PerformanceNavigationTiming
          | undefined;
        const firstLatency = nav ? Math.round(nav.duration) : 0;

        // 首屏真实 status 从 cookie 拿（由 CF Pages Function 写入）
        const pageStatus = readCookie("page_status");
        const status = pageStatus ? Number(pageStatus) : 200;

        // 用完就清掉，避免影响后续 SPA 跳转
        if (pageStatus) clearCookie("page_status");
        const pagePath = readCookie("page_path");
        if (pagePath) clearCookie("page_path");

        sendCollect(to.path, Number.isFinite(status) ? status : 200, firstLatency);
        return;
      }

      // ------ SPA 跳转 ------
      if (to.path === from.path) return;

      const latency = start ? Math.round(performance.now() - start) : 0;

      // 逻辑 status：路由是否命中（不是 HTTP status，但可用）
      const status = to.matched && to.matched.length > 0 ? 200 : 404;

      sendCollect(to.path, status, latency);
    });
  },
});