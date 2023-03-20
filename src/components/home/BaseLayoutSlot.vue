<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLayoutSlot',
  setup(_props, { emit }) {},
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
    <div class="max-w-[725px] mx-auto">
      <slot name="navbar"></slot>
    </div>
    <slot name="header"></slot>
    <div class="max-w-[725px] mx-auto mt-14 px-2 lg:py-4 lg:px-0">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
