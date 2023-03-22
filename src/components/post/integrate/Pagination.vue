<script setup lang="ts">
import { Arrow } from '@globals/atoms/icons'
import { paginationStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <Arrow width="42" height="42" :class="css.arrowLeft" />
    <span :class="css.pageCount">0</span>
    <Arrow width="42" height="42" :class="css.arrowRight" />
  </div>
</template>
