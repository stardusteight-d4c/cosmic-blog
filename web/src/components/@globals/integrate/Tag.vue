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
  <router-link :to="`/tag?equals=${tag}`">
    <span :class="css.tag">#{{ tag }}</span>
  </router-link>
</template>
