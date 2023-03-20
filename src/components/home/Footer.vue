<script lang="ts">
import { defineComponent } from 'vue'
import brazilIcon from '@/assets/brazil.png'

export default defineComponent({
  name: 'Footer',
  setup(_props, { emit }) {
    const assets = {
      brazilIcon,
    }

    return { assets }
  },
})
</script>

<template>
  <footer
    class="p-8 mt-28 border-t border-t-[#F2F2F2]/20 text-[#F2F2F2]/60 flex flex-col items-center text-center justify-center"
  >
    <div>
      <a
        href="https://github.com/stardusteight-d4c"
        target="_blank"
        class="flex justify-center hover:underline"
        >Gabriel Sena</a
      >
      <span
        class="flex items-center text-xs justify-center gap-x-1 text-[#F2F2F2]/30"
      >
        <ph-copyright :size="16" /> 2023 - {{ new Date().getFullYear() }}, All
        rights reserved.
      </span>
      <img
        :src="assets.brazilIcon"
        class="w-6 mx-auto opacity-80 mt-1 cursor-pointer"
      />
    </div>
  </footer>
</template>

<style scoped></style>
