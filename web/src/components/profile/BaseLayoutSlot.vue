<script setup lang="ts">
import { Navbar } from '@/components/navbar'
import { baseLayoutStyles as css } from './styles'
import { useAppStore } from '@/store'
import { computed } from 'vue'

const store = useAppStore()
const username = computed(() => store.state.profile.user.username)
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
