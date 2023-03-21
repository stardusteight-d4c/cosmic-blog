<script setup lang="ts">
import AppLogo from '@globals/atoms/icons/AppLogo.vue'
import { logoStyles as css } from './styles'
</script>

<template>
  <router-link to="/" :class="css.wrapper">
    <AppLogo />
    <span :class="css.cosmicSpan">Cosmic</span>
  </router-link>
</template>
