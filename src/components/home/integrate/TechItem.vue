<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { techs, descriptions } from '@/utils/data'
import { techItemStyles as css } from './styles'
type Techs = 'backend' | 'language' | 'frontend' | 'database'

const props = defineProps({
  type: {
    type: String as () => Techs,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const currentTechs = ref([0, 0, 0, 0])

function handleTechs(array: Techs) {
  const techsKeys = ['backend', 'language', 'frontend', 'database']
  const currentTech = techsKeys.findIndex((item) => item === array)
  const penultimateItemIndex = techs[array].length - 2
  const lastItemIndex = techs[array].length
  if (currentTechs.value[currentTech] <= penultimateItemIndex) {
    currentTechs.value[currentTech]++
  } else if (currentTechs.value[currentTech] === lastItemIndex - 1) {
    currentTechs.value[currentTech] = 0
  }
}

function isEven(number: number): boolean {
  return number % 2 === 0
}
</script>

<template>
  <div :class="css.wrapper">
    <img
      v-bind:src="techs[props.type][currentTechs[props.index]]"
      @click="handleTechs(props.type)"
      :class="css.handleImage(isEven(index))"
    />
    <div :class="css.dropDown">
      <div :class="css.triangle" />
      <p v-html="descriptions[props.type][currentTechs[props.index]]" />
    </div>
  </div>
</template>
