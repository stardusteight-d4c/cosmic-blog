<script setup lang="ts">
import { tagStyles as css } from "./styles";

defineProps({
  tag: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!-- localhost:5173/post/search?tag=typescript -->
  <span :class="css.tag">#{{ tag }}</span>
</template>
