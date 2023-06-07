<script setup lang="ts">
import {
  InteractionsWithPosts,
  UserPresentation,
  BaseLayoutSlot,
} from '@/components/profile'
import { useAppStore } from '@/store'
import { profileMethods } from '@/store/modules/profile'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const loading = ref(true)
const route = useRoute()
const id = route.params.id
const store = useAppStore()

onMounted(async () => {
  try {
    await store.dispatch(profileMethods.actions.GET_PROFILE_DATA, { id })
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
