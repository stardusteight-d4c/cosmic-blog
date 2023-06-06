<script setup lang="ts">
import { X } from '@/components/@globals/atoms/icons'
import Btn from '@globals/Btn.vue'

function logout() {
  document.cookie =
    'sessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}
</script>

<template>
  <router-link to="/">
    <Btn @click="logout" title="Exit">
      <template #icon><X width="16" /></template>
    </Btn>
  </router-link>
</template>
