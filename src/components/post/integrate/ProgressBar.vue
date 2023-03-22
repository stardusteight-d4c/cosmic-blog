<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import DonutChart from './DonutChart.vue'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import { progressBarStyles as css } from './styles'

const scrollPercentage = ref(0)

function handleArticleReadingScrollPercentage(): void {
  const articleBody = document.getElementById(ids.articleBody)!
  const computedStyle = window.getComputedStyle(articleBody)
  const matrixScale = computedStyle.getPropertyValue('transform')
  const postHeight = document.getElementById(ids.post)!.clientHeight
  const windowHeight = window.innerHeight
  const scrollY = window.scrollY

  if (matrixScale === 'matrix(1, 0, 0, 1, 0, 0)' || matrixScale === 'none') {
    const maxScrollY = postHeight * 1 - windowHeight // +0% (default)
    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
    scrollPercentage.value = newScrollPercentage
  } else if (matrixScale === 'matrix(1.2, 0, 0, 1.2, 0, 0)') {
    const maxScrollY = postHeight * 1.2 - windowHeight // +20%
    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
    scrollPercentage.value = newScrollPercentage
  }
}

onMounted((): void => {
  window.addEventListener('scroll', handleArticleReadingScrollPercentage)
})
onUnmounted((): void => {
  window.removeEventListener('scroll', handleArticleReadingScrollPercentage)
})
</script>

<template>
  <div :class="css.wrapper">
    <span :id="ids.readingProgress" class="invisible">{{
      parseInt(scrollPercentage.toFixed(0))
    }}</span>
    <span :class="css.span"
      >Progress {{ parseInt(scrollPercentage.toFixed(0)) }}%
    </span>
    <div :class="css.donutChartContainer">
      <DonutChart :percentage="scrollPercentage" class="w-8" />
    </div>
  </div>
</template>
