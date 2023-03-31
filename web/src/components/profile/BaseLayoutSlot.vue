<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Navbar } from '@/components/navbar'
import { baseLayoutStyles as css } from './styles'

const route = useRoute()
const username = Array.isArray(route.params.username)
  ? route.params.username[0]
  : route.params.username ?? ''
</script>

<template>
  <div :class="css.wrapper">
    <portal-target name="editProfileSocialLinks"></portal-target>
    <Navbar v-bind:path="username" />
    <div :class="css.container">
      <slot name="main"></slot>
    </div>
  </div>
</template>
