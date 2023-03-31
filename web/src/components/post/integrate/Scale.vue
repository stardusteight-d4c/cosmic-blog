<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowsIn, ArrowsOut } from '@/components/@globals/atoms/icons'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import { scaleStyles as css } from './styles'

const scaleUp = ref(false)
const marginTopOnScaleUp = ref(0)

onMounted((): void => {
  computedMarginTopOnScaleUp()
})

function handleScale(): void {
  scaleUp.value = !scaleUp.value
  const commentsSection = document.getElementById(ids.commentsSection)!
  const articleBody = document.getElementById(ids.articleBody)!
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

function computedMarginTopOnScaleUp(): void {
  const articleBody = document.getElementById(ids.articleBody)!
  const marginBottomArticleBody = 112
  const originalHeight = articleBody?.clientHeight
  const heightOnScaleUp = originalHeight * 1.2 // 20%
  const heightIncrease = heightOnScaleUp - originalHeight
  const marginTop = heightIncrease + marginBottomArticleBody
  marginTopOnScaleUp.value = marginTop
}

function handleSpanText(): 'Scale Up' | 'Scale Down' {
  return scaleUp.value ? 'Scale Up' : 'Scale Down'
}
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.span">
      {{ handleSpanText() }}
    </span>
    <div @click="handleScale" :class="css.scaleIconContainer">
      <ArrowsIn v-if="!scaleUp" />
      <ArrowsOut v-else />
    </div>
  </div>
</template>
