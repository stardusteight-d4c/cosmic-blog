<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import {
  BaseLayoutSlot,
  Header,
  Bio,
  PostGallery,
  Footer,
} from '@/components/home'

export default defineComponent({
  name: 'Home',
  components: { BaseLayoutSlot, Navbar, Header, Bio, PostGallery, Footer },
  setup() {},
})
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
