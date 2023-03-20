<script setup lang="ts">
import { baseLayoutSlotStyles } from './styles'

const css = baseLayoutSlotStyles
</script>

<template>
  <div :class="css.wrapper">
    <slot name="navbar"></slot>
    <slot name="header"></slot>
    <div :class="css.mainContent">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
