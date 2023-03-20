<script setup lang="ts">
import { baseLayoutSlotStyles as css } from './styles'
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
