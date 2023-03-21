<script setup lang="ts">
import { ProgressBar, Scale, Align, Opacity } from '.'
import { optionsStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <Opacity />
    <Align />
    <Scale />
    <ProgressBar />
  </div>
</template>
