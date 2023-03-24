<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'

const ctx = {
  SUCCESS: 'notification-container-success',
  ERROR: 'notification-container-error',
  WARNING: 'notification-container-warning',
}

const store = useAppStore()
const notifications = computed(() => store.state.notifications)
</script>

<template>
  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-5 z-[1000] text-[#F2F2F2]"
  >
    <div
      :class="ctx[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <h2 class="text-xl text-center">{{ notification.title }}</h2>
      <p class="text-lg">{{ notification.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification-container-success {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  box-shadow: 0 8px 32px 0 rgba(34, 34, 34, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 900px;
  border: 1px solid rgb(0, 255, 0, 0.5);
}
.notification-container-error {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  box-shadow: 0 8px 32px 0 rgba(34, 34, 34, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 900px;
  border: 1px solid rgba(255, 0, 0, 0.5);
}
.notification-container-warning {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  box-shadow: 0 8px 32px 0 rgba(34, 34, 34, 0.37);
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 900px;
  border: 1px solid rgba(255, 255, 0, 0.5);
}
</style>
