<script setup lang="ts">
import { Chat, Star } from '@/components/@globals/atoms/icons'
import { articleFooterStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.iconContainer">
      <Star :class="css.icon" /> 38 Starred
    </span>
    <span :class="css.dividerSpan">|</span>
    <span :class="css.iconContainer">
      <Chat :class="css.icon" /> 2 Comments
    </span>
  </div>
</template>
