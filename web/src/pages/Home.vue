<script setup lang="ts">
import {
  BaseLayoutSlot,
  Header,
  Bio,
  PostGallery,
  Footer,
} from '@/components/home'
</script>

<template>
  <BaseLayoutSlot>
    <template #header>
      <Header />
    </template>
    <Bio />
    <PostGallery />
    <template #footer>
      <Footer />
    </template>
  </BaseLayoutSlot>
</template>
