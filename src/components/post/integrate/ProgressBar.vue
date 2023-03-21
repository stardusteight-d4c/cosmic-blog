<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import DonutChart from './DonutChart.vue'

export default defineComponent({
  name: 'PostProgressBar',
  components: { DonutChart },

  setup() {
    const scrollPercentage = ref(0)

    const onScroll = () => {
      const postHeight = document.getElementById('post')!.clientHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const maxScrollY = postHeight - windowHeight
      const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100
      scrollPercentage.value = newScrollPercentage
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
    })

    return { scrollPercentage }
  },
})
</script>

<template>
  <!-- No donut se a escala estiver em +30% ao a cada 3% adicionar 1% -->
  <div class="flex items-center gap-x-2 group">
    <span
      class="animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70"
      >Progress {{ parseInt(scrollPercentage.toFixed(0)) }}%
    </span>
    <div
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
      <DonutChart :percentage="scrollPercentage" class="w-8" />
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
