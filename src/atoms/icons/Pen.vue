<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pen',
  props: {
    color: {
      type: String,
      default: '#F2F2F2',
    },
  },
})
</script>

<template>
  <svg
    class="css-i6dzq1"
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="none"
    stroke-width="2"
    v-bind:stroke="color"
    height="24"
    width="24"
    viewBox="0 0 24 24"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
</template>

<style scoped></style>
