<template>
  <Teleport v-if="target" :to="target">
    <section
      ref="panelRoot"
      class="contact-panel"
      aria-label="Social contacts"
      @mouseenter="suspendBloggerTooltip"
      @mouseleave="restoreBloggerTooltip"
      @click.stop
    >
      <div class="contact-icons">
        <a
          class="contact-icon-button"
          href="https://github.com/xianbo-deep"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <img class="contact-icon" src="/icons/github.svg" alt="" />
        </a>

        <button
          v-for="item in qrItems"
          :key="item.name"
          class="contact-icon-button"
          type="button"
          :class="{ active: activeItem?.name === item.name }"
          :aria-label="`${showText}${item.name}${qrText}`"
          :aria-expanded="activeItem?.name === item.name"
          :title="item.name"
          :data-contact-name="item.name"
          @click="toggle(item)"
        >
          <img class="contact-icon" :src="item.icon" alt="" />
        </button>
      </div>

      <Transition :css="false" @enter="onPanelEnter" @leave="onPanelLeave">
        <div v-if="activeItem" class="contact-qr-card" :key="activeItem.name">
          <div class="contact-qr-image-wrap">
            <img
              class="contact-qr-image"
              :src="activeItem.qr"
              :alt="`${activeItem.name}${qrText}`"
            />
          </div>
        </div>
      </Transition>
    </section>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";

type QrItem = {
  name: string;
  qr: string;
  icon: string;
};

const showText = "\u663e\u793a";
const qrText = "\u4e8c\u7ef4\u7801";

const qrItems: QrItem[] = [
  {
    name: "\u5fae\u4fe1",
    qr: "/qrcode/wechat.png",
    icon: "/icons/wechat.svg",
  },
  {
    name: "QQ",
    qr: "/qrcode/qq.png",
    icon: "/icons/qq.svg",
  },
  {
    name: "\u6296\u97f3",
    qr: "/qrcode/douyin.png",
    icon: "/icons/douyin.svg",
  },
];

const activeItem = ref<QrItem | null>(null);
const target = ref<Element | null>(null);
const panelRoot = ref<HTMLElement | null>(null);
const route = useRoute();
let bloggerTooltipSnapshot: {
  ariaLabel: string | null;
  balloonPos: string | null;
} | null = null;

const resolveTarget = () => {
  target.value = document.querySelector(".vp-blogger-info .vp-blogger");
};

const toggle = (item: QrItem) => {
  if (activeItem.value?.name !== item.name) {
    animateIcon(item.name);
  }

  activeItem.value = activeItem.value?.name === item.name ? null : item;
};

const close = () => {
  activeItem.value = null;
};

const getBloggerEl = () => target.value as HTMLElement | null;

const suspendBloggerTooltip = () => {
  const bloggerEl = getBloggerEl();
  if (!bloggerEl) return;

  if (!bloggerTooltipSnapshot) {
    bloggerTooltipSnapshot = {
      ariaLabel: bloggerEl.getAttribute("aria-label"),
      balloonPos: bloggerEl.getAttribute("data-balloon-pos"),
    };
  }

  bloggerEl.removeAttribute("aria-label");
  bloggerEl.removeAttribute("data-balloon-pos");
};

const restoreBloggerTooltip = () => {
  const bloggerEl = getBloggerEl();
  if (!bloggerEl || !bloggerTooltipSnapshot) return;

  if (bloggerTooltipSnapshot.ariaLabel) {
    bloggerEl.setAttribute("aria-label", bloggerTooltipSnapshot.ariaLabel);
  }

  if (bloggerTooltipSnapshot.balloonPos) {
    bloggerEl.setAttribute("data-balloon-pos", bloggerTooltipSnapshot.balloonPos);
  }

  bloggerTooltipSnapshot = null;
};

const animateIcon = (name: string) => {
  const rootEl = panelRoot.value;
  if (!rootEl) return;

  const button = rootEl.querySelector<HTMLElement>(`[data-contact-name="${name}"]`);
  if (!button) return;

  gsap.killTweensOf(button);
  gsap.fromTo(
    button,
    { y: -1, scale: 0.94 },
    {
      y: 0,
      scale: 1,
      duration: 0.42,
      ease: "elastic.out(1, 0.58)",
    },
  );
};

const onPanelEnter = (el: Element, done: () => void) => {
  gsap.killTweensOf(el);
  const panel = el as HTMLElement;
  const imageWrap = panel.querySelector(".contact-qr-image-wrap");
  const image = panel.querySelector(".contact-qr-image");
  const targetHeight = panel.scrollHeight;

  const timeline = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      panel.style.height = "auto";
      done();
    },
  });

  timeline.fromTo(
    panel,
    {
      opacity: 0,
      height: 0,
      y: -12,
      scale: 0.975,
      filter: "blur(10px)",
      transformOrigin: "top center",
    },
    {
      opacity: 1,
      height: targetHeight,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.36,
    },
  );

  timeline.fromTo(
    imageWrap,
    {
      opacity: 0,
      y: 10,
      scale: 0.96,
      filter: "blur(6px)",
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.34,
      ease: "expo.out",
    },
    "-=0.22",
  );

  timeline.fromTo(
    image,
    { scale: 1.035 },
    { scale: 1, duration: 0.5, ease: "power2.out" },
    "-=0.3",
  );
};

const onPanelLeave = (el: Element, done: () => void) => {
  gsap.killTweensOf(el);
  const panel = el as HTMLElement;
  const imageWrap = panel.querySelector(".contact-qr-image-wrap");

  const timeline = gsap.timeline({ onComplete: done });

  timeline.to(imageWrap, {
    opacity: 0,
    y: -4,
    scale: 0.98,
    filter: "blur(5px)",
    duration: 0.12,
    ease: "power2.in",
  });

  timeline.fromTo(panel, {
    height: panel.offsetHeight,
  }, {
    opacity: 0,
    height: 0,
    y: -8,
    scale: 0.985,
    filter: "blur(7px)",
    duration: 0.2,
    ease: "power2.in",
  }, "-=0.04");
};

const onDocumentPointerDown = (event: PointerEvent) => {
  if (!activeItem.value) return;
  const panelEl = panelRoot.value;

  if (panelEl?.contains(event.target as Node)) return;

  close();
};

onMounted(() => {
  resolveTarget();

  if (!target.value) {
    window.setTimeout(resolveTarget, 120);
  }

  document.addEventListener("pointerdown", onDocumentPointerDown);
});

watch(
  () => route.fullPath,
  async () => {
    close();
    await nextTick();
    resolveTarget();
  },
);

onBeforeUnmount(() => {
  restoreBloggerTooltip();
  document.removeEventListener("pointerdown", onDocumentPointerDown);
});
</script>

<style scoped>
.contact-panel {
  position: relative;
  z-index: 8;
  display: grid;
  width: min(100% - 1.4rem, 240px);
  margin: 0.78rem auto 0;
  isolation: isolate;
}

.contact-icons {
  display: flex;
  justify-content: center;
  gap: 0.38rem;
  width: fit-content;
  margin: 0 auto;
  padding: 0.24rem;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg) 94%, #fff), color-mix(in srgb, var(--vp-c-bg) 84%, transparent));
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 76%, transparent);
  border-radius: 999px;
  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.07),
    inset 0 1px 0 color-mix(in srgb, var(--vp-c-bg) 72%, #fff);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.contact-panel:has(.contact-qr-card) .contact-icons {
  border-color: color-mix(in srgb, var(--vp-c-text) 14%, var(--vp-c-border));
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.085),
    inset 0 1px 0 color-mix(in srgb, var(--vp-c-bg) 76%, #fff);
}

.contact-icon-button {
  position: relative;
  display: grid;
  width: 1.9rem;
  height: 1.9rem;
  padding: 0;
  place-items: center;
  color: var(--vp-c-text-mute);
  background: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    box-shadow 0.18s ease,
    color 0.18s ease,
    transform 0.18s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.contact-icon-button:hover,
.contact-icon-button.active {
  color: var(--vp-c-text);
  background: var(--vp-c-bg);
  box-shadow: 0 9px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.contact-icon-button.active::after {
  position: absolute;
  bottom: -0.18rem;
  left: 50%;
  width: 0.34rem;
  height: 2px;
  background: var(--vp-c-text);
  border-radius: 999px;
  content: "";
  transform: translateX(-50%);
}

.contact-icon {
  display: block;
  width: 1.05rem;
  height: 1.05rem;
  object-fit: contain;
}

.contact-qr-card {
  position: relative;
  width: min(206px, 100%);
  margin: 0.68rem auto 0;
  overflow: hidden;
  padding: 0.5rem;
  color: var(--vp-c-text);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg) 98%, #fff), color-mix(in srgb, var(--vp-c-bg) 94%, #f7f7f4));
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 82%, transparent);
  border-radius: 8px;
  box-shadow:
    0 14px 34px rgba(0, 0, 0, 0.105),
    0 2px 8px rgba(0, 0, 0, 0.055),
    inset 0 1px 0 color-mix(in srgb, var(--vp-c-bg) 72%, #fff);
  transform-origin: top center;
  will-change: height, transform, opacity, filter;
}

.contact-qr-card::after {
  display: none;
}

.contact-qr-image-wrap {
  position: relative;
  z-index: 1;
  padding: 0.36rem;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 70%, #000);
  border-radius: 8px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.82),
    0 8px 20px rgba(0, 0, 0, 0.055);
}

.contact-qr-image {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 5px;
  object-fit: contain;
}

[data-theme="dark"] .contact-qr-card {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg) 96%, #1d1d1d), color-mix(in srgb, var(--vp-c-bg) 90%, #111));
  box-shadow:
    0 18px 46px rgba(0, 0, 0, 0.54),
    0 2px 8px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .contact-icons {
  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .contact-panel:has(.contact-qr-card) .contact-icons {
  border-color: color-mix(in srgb, var(--vp-c-text) 18%, var(--vp-c-border));
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .contact-panel {
    width: min(100% - 1rem, 226px);
  }

  .contact-qr-card {
    width: min(204px, 100%);
  }
}
</style>
