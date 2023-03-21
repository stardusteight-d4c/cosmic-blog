<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Pagination',
})
</script>

<template>
  <div class="flex items-center justify-end mt-4 text-[#7c7c7c]">
    <ph-arrow-left :size="42" class="cursor-pointer hover:text-[#b8b8b8] p-1" />
    <span class="text-lg font-semibold">0</span>
    <ph-arrow-right
      :size="42"
      class="cursor-pointer hover:text-[#b8b8b8] p-1"
    />
  </div>
</template>

