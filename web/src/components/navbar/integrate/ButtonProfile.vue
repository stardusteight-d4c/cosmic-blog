<script setup lang="ts">
import AppLogo from "@globals/atoms/icons/AppLogo.vue";
import { profileButtonStyles as css } from "./styles";

interface IProps {
  username: string;
}
defineProps<IProps>();
</script>

<template>
  <router-link
    :to="{ name: 'profile', params: { username } }"
    :class="css.wrapper"
  >
    <div :class="css.innerContainer">
      <div :class="css.animations.spinner">
        <div :class="css.animations.spinner1" />
      </div>
      <AppLogo width="24" height="24" :class="css.appLogo" />
    </div>
  </router-link>
</template>
