<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { ArrowsIn, ArrowsOut } from '@globals/atoms/icons'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'

export default defineComponent({
  name: 'PostScale',
  components: { ArrowsOut, ArrowsIn },
  setup(_props, { emit }) {
    const scaleUp = ref(false)
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
    const marginTopOnScaleUp = ref(0)

    function handleScale() {
      scaleUp.value = !scaleUp.value
      const commentsSection = document.getElementById(HTML_ID.commentsSection)!
      const articleBody = document.getElementById(HTML_ID.articleBody)!
      if (scaleUp.value === true) {
        commentsSection.style.marginTop = `${marginTopOnScaleUp.value}px`
        articleBody.style.transform = 'scale(1.2)'
        articleBody.style.marginTop = '-200px'
        articleBody.style.transformOrigin = 'top'
      } else {
        commentsSection.style.marginTop = '0px'
        articleBody.style.transform = 'scale(1)'
        articleBody.style.marginTop = '0'
      }
    }

    onMounted(() => {
      computedMarginTopOnScaleUp()
    })

    const computedMarginTopOnScaleUp = () => {
      const articleBody = document.getElementById(HTML_ID.articleBody)!
      const marginBottomArticleBody = 112
      const originalHeight = articleBody?.clientHeight
      const heightOnScaleUp = originalHeight * 1.2 // 20%
      const heightIncrease = heightOnScaleUp - originalHeight
      const marginTop = heightIncrease + marginBottomArticleBody
      marginTopOnScaleUp.value = marginTop
    }

    return { scaleUp, handleScale }
  },
})
</script>

<template>
  <div class="flex items-center gap-x-2 group">
    <span class="animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70">
      {{ scaleUp ? 'Scale Down' : 'Scale Up' }}
    </span>
    <div
      @click="handleScale"
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
      <ArrowsOut v-if="!scaleUp" color="#F2F2F280" />
      <ArrowsIn v-else color="#F2F2F280" />
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
