<script setup lang="ts">
import { Navbar } from '@/components/navbar'
import { baseLayoutSlotStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <portal-target name="deletePostPopUp"></portal-target>
    <portal-target name="savePopUp"></portal-target>
    <portal-target name="importSavePopUp"></portal-target>
    <div :class="css.container">
      <Navbar path="new" />
      <slot name="main"></slot>
    </div>
  </div>
</template>
