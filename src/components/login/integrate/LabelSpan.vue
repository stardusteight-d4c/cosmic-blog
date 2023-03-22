<script setup lang="ts">
defineProps({
  delay: {
    type: String,
    required: true,
  },
  letter: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <span :style="{ transitionDelay: delay }">{{ letter }}</span>
</template>
