// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";
import "vuepress-theme-hope/presets/left-blog-info.scss";
import "vuepress-theme-hope/presets/bounce-icon.scss";
import SubscribeForm from "./components/SubscribeForm.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineClientConfig({
  enhance({ app }) {
    app.component("SubscribeForm", SubscribeForm);
  },

  setup() {
    const router = useRouter();

    // =========================
    // Visitor ID + Cookie
    // =========================
    const getVisitorId = () => {
      const key = "blog_visitor_id";
      try {
        let id = localStorage.getItem(key) || "";
        if (!id) {
          id =
            Math.random().toString(36).slice(2) +
            Math.random().toString(36).slice(2);
          localStorage.setItem(key, id);
        }
        return id;
      } catch {
        return (
          Math.random().toString(36).slice(2) +
          Math.random().toString(36).slice(2)
        );
      }
    };

    const ensureVisitorCookie = () => {
      try {
        const vid = getVisitorId();
        // Secure 在 https 下才会生效；你是 https API，所以 OK
        document.cookie = `blog_visitor_id=${encodeURIComponent(
          vid
        )}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
      } catch {}
    };

    const readCookie = (name: string) => {
      const m = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${name}=([^;]+)`)
      );
      return m ? decodeURIComponent(m[1]) : "";
    };

    const clearCookie = (name: string) => {
      document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
    };

    // =========================
    // Collect sender
    // =========================
    const sendCollect = (path: string, status: number, latency: number) => {
      if (typeof window === "undefined") return;

      const data = {
        visitor_id: getVisitorId(),
        path,
        status,
        timestamp: Date.now(),
        latency,
      };

      fetch("https://api.xbzhong.cn/blog/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(() => {
        // 避免在页面卸载/移动端 keepalive 场景刷屏
      });
    };

    // =========================
    // De-dup helpers
    // =========================
    const normalizePath = (path: string) => {
      // 统一：去尾 /，去 .html
      const p = (path || "").replace(/\/$/, "").replace(/\.html$/, "");
      return p || "/";
    };

    const normalizeKey = (to: any) => {
      // 以 “路径 + query(可选) ”为统计口径；hash 一律忽略（hash 变化通常不算页面切换）
      const path = normalizePath(to.path);
      const query = to.query ? JSON.stringify(to.query) : "";
      return `${path}?${query}`;
    };

    // 等 2 帧，让渲染/异步组件加载更稳定（避免 afterEach 太早导致 1ms）
    const wait2Frames = () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => resolve())
        )
      );

    // =========================
    // State
    // =========================
    let start = 0;
    let firstReported = false;

    // 去重：短窗口内同 key 只上报一次
    let lastKey = "";
    let lastReportAt = 0;

    // =========================
    // Lifecycle hooks
    // =========================
    onMounted(() => {
      ensureVisitorCookie();
    });

    router.beforeEach((to, from) => {
      // 如果只是 hash 改变，直接跳过计时（不算一次页面切换）
      if (to.path === from.path && to.hash !== from.hash) return;
      start = performance.now();
    });

    router.afterEach(async (to, from) => {
      if (typeof window === "undefined") return;

      // 过滤：只变 hash 不算页面切换（否则会产生 0~1ms 噪声）
      if (to.path === from.path && to.hash !== from.hash) return;

      // key 去重：解决 /foo -> /foo/、.html 规范化、主题二次 push 等
      const key = normalizeKey(to);
      const now = performance.now();

      // 300ms 内同 key 视为同一次点击导致的重复 afterEach
      if (key === lastKey && now - lastReportAt < 300) return;
      lastKey = key;
      lastReportAt = now;

      // ---------- 首屏 ----------
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

        // 用完就清掉
        if (pageStatus) clearCookie("page_status");
        const pagePath = readCookie("page_path");
        if (pagePath) clearCookie("page_path");

        sendCollect(to.path, Number.isFinite(status) ? status : 200, firstLatency);
        return;
      }

      // ---------- SPA 跳转 ----------
      // 如果规范化后其实没变，就不报（例如 /foo 与 /foo/ 互转）
      if (normalizeKey(to) === normalizeKey(from)) return;

      // 等两帧，让渲染更接近“用户看到内容”的时间点
      await wait2Frames();

      const latency = start ? Math.round(performance.now() - start) : 0;

      // 极短 latency 兜底过滤（可选，但很有用）
      // 有些主题/插件会产生 1~2ms 的重复触发，直接当噪声丢掉
      if (latency >= 0 && latency < 5) {
        // 如果你不想过滤真实很快的页面，把这段注释掉即可
        // return;
      }

      // 逻辑 status：路由是否命中（不是 HTTP status，但可用）
      const status = to.matched && to.matched.length > 0 ? 200 : 404;

      sendCollect(to.path, status, latency);
    });
  },
});
