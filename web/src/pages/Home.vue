<script setup lang="ts">
import {
  BaseLayoutSlot,
  Header,
  Bio,
  PostGallery,
  Footer,
} from '@/components/home'
import { useAppStore } from '@/store'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { postMethods } from '@store/modules/post'

const loading = ref(true)
const store = useAppStore()

onMounted(async () => {
  try {
    await store.dispatch(postMethods.actions.GET_HOME_POSTS, { skip: 0 })
    loading.value = false
  } catch (error) {
    console.error('Error loading user data:', error)
    loading.value = false
  }
})
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
