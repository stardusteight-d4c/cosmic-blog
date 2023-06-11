<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/store";

const ctx = {
  SUCCESS: "notification-container-success",
  ERROR: "notification-container-error",
  WARNING: "notification-container-warning",
};

const store = useAppStore();
const notifications = computed(() => store.state.notification.notifications);
</script>

<template>
  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-[14px] z-[1000] text-[#F2F2F2]"
  >
    <div
      v-for="notification in notifications"
      :class="`${ctx[notification.type]} animate-notification`"
      :key="notification.id"
    >
      <h2 class="text-xl text-center">{{ notification.title }}</h2>
      <p class="text-center w-80">{{ notification.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification-container-success {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 2px;
  border: 1px solid #00fe93;
  margin-top: 14px;
}
.notification-container-error {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 2px;
  border: 1px solid #ff008a;
  margin-top: 14px;
}
.notification-container-warning {
  background: rgba(64, 44, 44, 0.05);
  padding: 4px 14px;
  backdrop-filter: blur(7.5px);
  -webkit-backdrop-filter: blur(7.5px);
  border-radius: 2px;
  border: 1px solid #f7ff60;
  margin-top: 14px;
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.animate-notification {
  animation: slideIn ease-in 0.3s;
}
</style>
