<script setup lang="ts">
import { useAppStore } from "@/store";
import { Header, SocialLinks } from "./integrate";
import { computed } from "vue";

const store = useAppStore();
const userData = computed(() => store.state.profile.user);
const userAvatar = userData.value.avatar
</script>

<template>
  <Header  :avatarUrl="userAvatar" :username="userData.username" />
  <SocialLinks :socialLinks="userData.socialLinks" />
</template>
