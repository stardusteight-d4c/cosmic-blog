<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ArrowsIn, ArrowsOut } from '@/atoms/icons'

export default defineComponent({
  name: 'PostScale',
  components: { ArrowsOut, ArrowsIn },
  setup(_props, { emit }) {
    // const scaleUp = ref(false)
    // function handleScale() {
    //   scaleUp.value = !scaleUp.value
    //   emit('scaleChanged', scaleUp.value)
    // }
    // return { scaleUp, handleScale }
  },
})
</script>

<template>
  <div class="flex items-center gap-x-2 group">
    <span class="animate-span hidden group-hover:block text-[#F2F2F2]/70">
      <!-- {{ scaleUp ? 'Scale Down' : 'Scale Up' }} -->
    </span>
    <div
      class="bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center"
    >
    <ph-headlights :size="32" />
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
