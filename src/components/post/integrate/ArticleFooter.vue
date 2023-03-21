<script setup lang="ts">
import { Chat, Star } from '@globals/atoms/icons'

defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <div
    v-if="showFooter"
    class="border-t flex gap-x-2 items-center justify-center border-[#F2F2F2]/10 py-4 mt-8 text-[#F2F2F2]/60"
  >
    <span class="flex items-center gap-x-1">
      <Star class="w-4 -mt-[1px]" /> 38 Starred
    </span>
    <span
      class="text-2xl mb-1 text-[#F2F2F2]/20"
      >|</span
    >
    <span class="flex items-center gap-x-1">
      <Chat class="w-4 -mt-[1px]" /> 2 Comments
    </span>
  </div>
</template>
