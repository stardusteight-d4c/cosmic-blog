<script setup lang="ts">
import headerBackground from '@/assets/hero.png'
import TechItem from './integrate/TechItem.vue'
import Memoji from './integrate/Memoji.vue'
import { headerStyles } from './styles'
type Types = 'backend' | 'language' | 'frontend' | 'database'

const css = headerStyles
const types: Array<Types> = ['backend', 'language', 'frontend', 'database']
</script>

<template>
  <div :class="css.wrapper">
    <img :src="headerBackground" :class="css.backgroud" />
    <div :class="css.contentWrapper">
      <div :class="css.techsContainer">
        <TechItem v-for="(type, index) in types" :type="type" :index="index" />
      </div>
      <Memoji />
    </div>
  </div>
</template>
