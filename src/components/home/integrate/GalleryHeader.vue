<script setup lang="ts">
import { SquaresFour } from '@globals/atoms/icons'
import SearchBar from './SearchBar.vue'
import { postHeaderStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.squaresFourContainer">
      <SquaresFour width="24" /><span :class="css.gallerySpan"
        >Gallery view</span
      >
    </div>
    <SearchBar />
  </div>
</template>
