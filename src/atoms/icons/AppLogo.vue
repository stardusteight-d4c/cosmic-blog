<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLogo',
  props: {
    class: {
      type: String,
    },
    width: {
      type: String,
      default: '32',
    },
    height: {
      type: String,
      default: '32',
    },
  },
})
</script>

<template>
  <svg
    v-bind:class="class"
    xmlns="http://www.w3.org/2000/svg"
    v-bind:width="width"
    v-bind:height="height"
    fill="#3b82f6"
    viewBox="0 0 256 256"
  >
    <rect width="256" height="256" fill="none"></rect>
    <path
      d="M59.3,40H196.7a8,8,0,0,1,5.6,13.7L128,128,53.7,53.7A8,8,0,0,1,59.3,40Z"
      fill="none"
      stroke="#3b82f6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
    <path
      d="M59.3,216H196.7a8,8,0,0,0,5.6-13.7L128,128,53.7,202.3A8,8,0,0,0,59.3,216Z"
      fill="none"
      stroke="#3b82f6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></path>
    <line
      x1="72"
      y1="72"
      x2="184"
      y2="72"
      fill="none"
      stroke="#3b82f6"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"
    ></line>
  </svg>
</template>
