<template>
  <Blog>
    <template #heroLogo>
      <HomeHero3D />
    </template>

    <template #heroInfo>
      <span />
    </template>
  </Blog>
</template>

<script setup lang="ts">
import { Blog } from "vuepress-theme-hope/blog";
import HomeHero3D from "../components/HomeHero3D.vue";
</script>

<style scoped>
:deep(.vp-blog-hero .slide-down-button),
:deep(.vp-blog-hero .scroll-down),
:deep(.vp-blog-hero .hero-slide-down),
:deep(.vp-blog-hero .hero-info-wrapper + .slide-down-button) {
  display: none;
}
</style>
