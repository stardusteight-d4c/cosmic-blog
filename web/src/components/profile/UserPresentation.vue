<script setup lang="ts">
import { useAppStore } from '@/store'
import { Header, SocialLinks } from './integrate'
import { computed } from 'vue'
import { getAvatarUrlById } from '@/utils'

const store = useAppStore()
const userData = computed(() => store.state.profile.user)
const userAvatar = getAvatarUrlById(userData.value.avatar)
const handledAvatarString = userAvatar?.replace(/-\d+\.png$/, '-')!
</script>

<template>
  <Header :avatarUrl="handledAvatarString" :username="userData.username" />
  <SocialLinks :socialLinks="userData.socialLinks" />
</template>
