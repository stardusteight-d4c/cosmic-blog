<script setup lang="ts">
import { ref } from 'vue'
import { Lightbulb } from '@globals/atoms/icons'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import { opacityStyles as css } from './styles'

const opacity = ref<'80' | '90' | '100'>('80')

function handleOpacity() {
  const element = document.getElementById(ids.htmlBody)!
  if (opacity.value === '80') {
    element.style.color = '#F2F2F299'
    opacity.value = '90'
  } else if (opacity.value === '90') {
    element.style.color = '#CCC'
    opacity.value = '100'
  } else if (opacity.value === '100') {
    element.style.color = '#F2F2F280'
    opacity.value = '80'
  }
}

function handleSpanText() {
  return (
    (opacity.value === '80' && 'Brightness I') ||
    (opacity.value === '90' && 'Brightness II') ||
    (opacity.value === '100' && 'Brightness III')
  )
}

function handleColor() {
  return (
    (opacity.value === '80' && '#F2F2F280') ||
    (opacity.value === '90' ? '#F2F2F299' : '#CCC')
  )
}
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.span">
      {{ handleSpanText() }}
    </span>
    <div @click="handleOpacity" :class="css.lightbulbIconContainer">
      <Lightbulb :style="{ color: handleColor() }" />
    </div>
  </div>
</template>
