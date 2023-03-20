<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArrowRight',
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
    xmlns="http://www.w3.org/2000/svg"
    class="css-i6dzq1"
    stroke-linejoin="round"
    stroke-linecap="round"
    fill="none"
    stroke-width="2"
    :stroke="color"
    height="24"
    width="24"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
    />
  </svg>
</template>
