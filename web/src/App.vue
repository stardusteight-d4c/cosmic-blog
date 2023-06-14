<script setup lang="ts">
import { RouterView } from "vue-router";
import Notification from "@globals/Notification.vue";
</script>

<template>
  <Notification />
  <RouterView :key="$route.fullPath" />
</template>
