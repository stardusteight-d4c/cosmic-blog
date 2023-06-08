<script setup lang="ts">
import { Options } from './integrate'
import { Navbar } from '@/components/navbar'
import { baseLayoutSlotStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <portal-target name="deleteCommentPopUp"></portal-target>
    <Options />
    <Navbar path="post" />
    <div :class="css.mainContainer">
      <slot name="main"></slot>
    </div>
  </div>
</template>
