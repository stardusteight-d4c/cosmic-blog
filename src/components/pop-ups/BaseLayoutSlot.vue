<script setup lang="ts">
import { baseLayoutSlotStyles as css } from './styles'
</script>

<template>
  <div :class="css.overlay" />
  <div :class="css.wrapper">
    <div :class="css.container">
      <slot name="content"></slot>
    </div>
    <div :class="css.operations">
      <slot name="operations"></slot>
    </div>
  </div>
</template>
