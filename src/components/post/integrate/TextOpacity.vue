<script lang="ts">
import { defineComponent, ref } from 'vue'
import Lightbulb from '@/atoms/icons/Lightbulb.vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'

export default defineComponent({
  name: 'TextAlign',
  components: { Lightbulb },
  setup(_props, { emit }) {
    const opacity = ref<'80' | '90' | '100'>('80')
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE

    const handleOpacity = () => {
      const htmlBody = document.getElementById(HTML_ID.htmlBody)!
      if (opacity.value === '80') {
        htmlBody.style.color = '#F2F2F299'
        opacity.value = '90'
      } else if (opacity.value === '90') {
        htmlBody.style.color = '#CCC'
        opacity.value = '100'
      } else if (opacity.value === '100') {
        htmlBody.style.color = '#F2F2F280'
        opacity.value = '80'
      }
    }
    return { opacity, handleOpacity }
  },
})
</script>

<template>
  <div class="flex items-center gap-x-2 group">
    <span class="animate-span hidden group-hover:block text-[#F2F2F2]/70">
      {{
        (opacity === '80' && 'Brightness I') ||
        (opacity === '90' && 'Brightness II') ||
        (opacity === '100' && 'Brightness III')
      }}
    </span>
    <div
      @click="handleOpacity"
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
      <Lightbulb
        :color="
          (opacity === '80' && '#F2F2F280') ||
          (opacity === '90' ? '#F2F2F299' : '#CCC')
        "
      />
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
