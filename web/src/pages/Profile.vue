<script setup lang="ts">
import {
  InteractionsWithPosts,
  UserPresentation,
  BaseLayoutSlot,
} from '@/components/profile'
import { useAppStore } from '@/store'
import { ACTION_GET_PROFILE_DATA } from '@/store/modules/profile/actions'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(true)
const route = useRoute()
const id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id ?? ''
const store = useAppStore()

onMounted(async () => {
  try {
    await store.dispatch(ACTION_GET_PROFILE_DATA, { id })
    loading.value = false
  } catch (error) {
    console.error('Error loading user data:', error)
    loading.value = false
  }
})
</script>

<template>
  <BaseLayoutSlot v-if="!loading">
    <template #main>
      <UserPresentation />
      <InteractionsWithPosts />
    </template>
  </BaseLayoutSlot>
</template>
