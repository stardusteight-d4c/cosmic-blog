<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button
    class="flex items-center active:scale-100 hover:scale-105 justify-center py-1 px-[10px] rounded-full transition-all ease-in-out duration-[0.5] gap-2 bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-padding text-[#F2F2F2]"
  >
    <slot name="icon"></slot>
    {{ props.title }}
  </button>
</template>
