<script setup lang="ts">
import { Options } from './integrate'
import { baseLayoutSlotStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <portal-target name="deletePopUp"></portal-target>
    <Options />
    <slot name="navbar"></slot>
    <div :class="css.mainContainer">
      <slot name="main"></slot>
    </div>
  </div>
</template>
