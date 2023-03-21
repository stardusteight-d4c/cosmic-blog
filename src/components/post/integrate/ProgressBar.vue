<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import DonutChart from './DonutChart.vue'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'

const scrollPercentage = ref(0)

function onScroll() {
  const articleBody = document.getElementById(ids.articleBody)!
  const computedStyle = window.getComputedStyle(articleBody)
  const matrixScale = computedStyle.getPropertyValue('transform')
  // matrix(1, 0, 0, 1, 0, 0) or matrix(1.2, 0, 0, 1.2, 0, 0)
  const postHeight = document.getElementById('post')!.clientHeight

  if (matrixScale === 'matrix(1, 0, 0, 1, 0, 0)' || matrixScale === 'none') {
    const windowHeight = window.innerHeight * 1
    const scrollY = window.scrollY
    const maxScrollY = postHeight * 1 - windowHeight // +0% (default)

    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
    scrollPercentage.value = newScrollPercentage
  } else if (matrixScale === 'matrix(1.2, 0, 0, 1.2, 0, 0)') {
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY
    const maxScrollY = postHeight * 1.2 - windowHeight // +20%

    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
    scrollPercentage.value = newScrollPercentage
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <!-- No donut se a escala estiver em +30% a cada 3% adicionar 1% -->
  <div class="flex items-center gap-x-2 group">
    <span
      class="options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70"
      >Progress {{ parseInt(scrollPercentage.toFixed(0)) }}%
    </span>
    <div
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
      <DonutChart :percentage="scrollPercentage" class="w-8" />
    </div>
  </div>
</template>
