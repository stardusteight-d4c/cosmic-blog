<script setup lang="ts">
import { ref } from 'vue'
import myMemoji01 from '@/assets/my-memoji01.png'
import myMemoji02 from '@/assets/my-memoji02.png'
import myMemoji03 from '@/assets/my-memoji03.png'
import { memojiStyles } from './styles'

const css = memojiStyles
const memojis: string[] = [myMemoji01, myMemoji02, myMemoji03]
const currentMemoji = ref(0)

function handleMemoji() {
  const penultimateItemIndex = memojis.length - 2
  const lastItemIndex = memojis.length
  if (currentMemoji.value <= penultimateItemIndex) {
    currentMemoji.value++
  } else if (currentMemoji.value === lastItemIndex - 1) {
    currentMemoji.value = 0
  }
}
</script>

<template>
  <div :class="css.wrapper">
    <img
      @click="handleMemoji"
      v-bind:src="memojis[currentMemoji]"
      v-bind:key="currentMemoji"
      :class="css.image"
    />
  </div>
</template>

<style scoped>
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.animated-bounce {
  animation: bounce ease-in-out 0.3s;
}
</style>
