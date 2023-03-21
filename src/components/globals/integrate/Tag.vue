<script setup lang="ts">
import { tagStyles as css } from './styles'

defineProps({
  tag: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span :class="css.tag">#{{ tag }}</span>
</template>
