<template>
  <section class="qr-contact-card" aria-label="社交二维码">
    <div class="qr-header">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>

    <div class="qr-grid">
      <article
        v-for="item in visibleItems"
        :key="item.name"
        class="qr-item"
      >
        <div class="qr-image-wrap">
          <img
            class="qr-image"
            :src="item.src"
            :alt="`${item.name}二维码`"
            loading="lazy"
          />
        </div>
        <div class="qr-info">
          <strong>{{ item.name }}</strong>
          <span v-if="item.note">{{ item.note }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    eyebrow?: string;
    description?: string;
    wechat?: string;
    qq?: string;
    douyin?: string;
    wechatNote?: string;
    qqNote?: string;
    douyinNote?: string;
  }>(),
  {
    title: "联系我",
    eyebrow: "CONTACT",
    description: "扫码添加或关注，适合不方便跳转链接的平台。",
    wechat: "",
    qq: "",
    douyin: "",
    wechatNote: "微信",
    qqNote: "QQ",
    douyinNote: "抖音",
  },
);

const visibleItems = computed(() =>
  [
    { name: "微信", src: props.wechat, note: props.wechatNote },
    { name: "QQ", src: props.qq, note: props.qqNote },
    { name: "抖音", src: props.douyin, note: props.douyinNote },
  ].filter((item) => item.src),
);
</script>

<style scoped>
.qr-contact-card {
  position: relative;
  isolation: isolate;
  max-width: 900px;
  padding: clamp(1.25rem, 3vw, 2rem);
  margin: 1.25rem auto;
  overflow: hidden;
  color: #050505;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(247, 247, 244, 0.66)),
    radial-gradient(rgba(5, 5, 5, 0.055) 1px, transparent 1px);
  background-size: auto, 24px 24px;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
  box-shadow:
    0 16px 42px rgba(0, 0, 0, 0.075),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.qr-contact-card::before {
  position: absolute;
  inset: 12px;
  z-index: -1;
  border: 1px solid rgba(5, 5, 5, 0.07);
  border-radius: 8px;
  content: "";
  pointer-events: none;
}

.qr-header {
  margin-bottom: 1.1rem;
  text-align: left;
}

.eyebrow {
  display: block;
  margin-bottom: 0.42rem;
  color: rgba(5, 5, 5, 0.46);
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.16em;
  line-height: 1;
}

.qr-header h2 {
  margin: 0;
  color: #050505;
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 850;
  line-height: 1.12;
}

.qr-header p {
  max-width: 34rem;
  margin: 0.55rem 0 0;
  color: rgba(5, 5, 5, 0.58);
  font-size: 0.95rem;
  line-height: 1.65;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.qr-item {
  position: relative;
  padding: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(5, 5, 5, 0.1);
  border-radius: 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s cubic-bezier(0.2, 0.72, 0.18, 1);
}

.qr-item:hover {
  border-color: rgba(5, 5, 5, 0.24);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.11);
  transform: translateY(-3px);
}

.qr-image-wrap {
  display: grid;
  aspect-ratio: 1;
  place-items: center;
  padding: 10px;
  background: #fff;
  border: 1px solid rgba(5, 5, 5, 0.08);
  border-radius: 8px;
}

.qr-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-top: 0.82rem;
}

.qr-info strong {
  color: #050505;
  font-size: 1rem;
  font-weight: 800;
}

.qr-info span {
  color: rgba(5, 5, 5, 0.48);
  font-size: 0.82rem;
  white-space: nowrap;
}

[data-theme="dark"] .qr-contact-card {
  color: rgba(255, 255, 255, 0.92);
  background:
    linear-gradient(135deg, rgba(28, 28, 28, 0.94), rgba(18, 18, 18, 0.9)),
    radial-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: auto, 24px 24px;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow:
    0 16px 42px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .qr-contact-card::before,
[data-theme="dark"] .qr-item,
[data-theme="dark"] .qr-image-wrap {
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .qr-item {
  background: rgba(255, 255, 255, 0.045);
}

[data-theme="dark"] .qr-item:hover {
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38);
}

[data-theme="dark"] .qr-image-wrap {
  background: rgba(255, 255, 255, 0.92);
}

[data-theme="dark"] .eyebrow,
[data-theme="dark"] .qr-header p,
[data-theme="dark"] .qr-info span {
  color: rgba(255, 255, 255, 0.56);
}

[data-theme="dark"] .qr-header h2,
[data-theme="dark"] .qr-info strong {
  color: rgba(255, 255, 255, 0.94);
}

@media (max-width: 720px) {
  .qr-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .qr-contact-card {
    padding: 1.1rem;
  }

  .qr-contact-card::before {
    inset: 8px;
  }
}
</style>
