<script setup lang="ts">
import { useRoute } from 'vue-router'
import { BaseLayoutSlot, Article, Comments } from '@/components/post'
import { postMethods } from '@/store/modules/post'
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store'

const route = useRoute()
const store = useAppStore()
const id = route.params.id
const post = computed(() => store.state.post.post)
const loading = ref(true)

onMounted(async () => {
  try {
    await store.dispatch(postMethods.actions.GET_POST_DATA, { postId: id })
    loading.value = false
  } catch (error) {
    console.error('Error loading post data:', error)
    loading.value = false
  }
})
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <Article v-bind="post" />
      <Comments />
    </template>
  </BaseLayoutSlot>
</template>
