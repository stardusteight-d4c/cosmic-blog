<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Calendar',
  props: {
    color: {
      type: String,
      default: '#F2F2F2',
    },
    size: {
      type: String,
      default: '#F2F2F2',
    },
  },
})
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :fill="color" viewBox="0 0 256 256">
    <path
      d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"
    ></path>
  </svg>
</template>
