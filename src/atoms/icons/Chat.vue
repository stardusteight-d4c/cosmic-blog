<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Chat',
  props: {
    color: {
      type: String,
      default: '#F2F2F2',
    },
  },
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="#1a1a1a" viewBox="0 0 256 256">
    <rect fill="none"></rect>
    <path
      d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z"
      :fill="color"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
    <circle cx="128" cy="128" r="12"></circle>
    <circle cx="80" cy="128" r="12"></circle>
    <circle cx="176" cy="128" r="12"></circle>
  </svg>
</template>
