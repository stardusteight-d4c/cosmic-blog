<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowsIn, ArrowsOut } from '@/atoms/icons'
import TextAlignJustify from '@/atoms/icons/TextAlignJustify.vue'
import TextAlignLeft from '@/atoms/icons/TextAlignLeft.vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'
import TextAlignCenter from '@/atoms/icons/TextAlignCenter.vue'

export default defineComponent({
  name: 'PostScale',
  components: {
    ArrowsOut,
    ArrowsIn,
    TextAlignJustify,
    TextAlignLeft,
    TextAlignCenter,
  },
  setup(_props, { emit }) {
    const textAlign = ref<'left' | 'justify' | 'center'>('left')
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE

    function handleTextAlign() {
      const htmlBody = document.getElementById(HTML_ID.htmlBody)!

      if (textAlign.value === 'left') {
        textAlign.value = 'justify'
        htmlBody.style.textAlign = 'justify'
      } else if (textAlign.value === 'justify') {
        textAlign.value = 'left'
        htmlBody.style.textAlign = 'left'
      }
    }
    return { textAlign, handleTextAlign }
  },
})
</script>

<template>
  <div class="flex items-center gap-x-2 group">
    <span class="animate-span hidden group-hover:block text-[#F2F2F2]/70">
      {{
        (textAlign === 'justify' && 'Align Justify') ||
        (textAlign === 'left' && 'Align Left')
      }}
    </span>
    <div
      @click="handleTextAlign"
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
      <TextAlignJustify v-if="textAlign === 'justify'" color="#F2F2F280" />
      <TextAlignLeft v-else color="#F2F2F280" />
    </div>
  </div>
</template>

<style scoped>
@keyframes from-left {
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

.animate-span {
  animation: from-left ease-in 0.2s;
}
</style>
