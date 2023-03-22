<script setup lang="ts">
import { Navbar } from '@/components/navbar'
import { baseLayoutSlotStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <portal-target name="chooseAvatarPopUp"></portal-target>
    <div :class="css.container">
      <Navbar path="login" />
      <slot name="main"></slot>
    </div>
  </div>
</template>
