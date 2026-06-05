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