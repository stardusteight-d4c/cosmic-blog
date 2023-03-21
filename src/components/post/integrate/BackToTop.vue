<script setup lang="ts">
import { ref } from 'vue'
import { Top } from '@globals/atoms/icons'
import { backToTopStyles as css } from './styles'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'

const showElement = ref(false)

window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  const readingProgress = document.getElementById(
    ids.readingProgress
  )?.textContent

  if (Number(readingProgress) > 50) {
    showElement.value = true
  } else {
    showElement.value = false
  }
}

function backToTop() {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera

  setTimeout(() => {
    showElement.value = false
  }, 100)
}
</script>

<template>
  <div v-if="showElement" @click="backToTop" :class="css.wrapper">
    <span :class="css.span"> Back to top </span>
    <div :class="css.topIconContainer">
      <Top color="#F2F2F280" />
    </div>
  </div>
</template>
