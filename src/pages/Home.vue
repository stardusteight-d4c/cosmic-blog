<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue'
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
    <template #navbar>
      <Navbar path="home" />
    </template>
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
