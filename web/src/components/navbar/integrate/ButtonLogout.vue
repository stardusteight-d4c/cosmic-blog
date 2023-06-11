<script setup lang="ts">
import { Logout } from "@/components/@globals/atoms/icons";
import router from "@/router";
import { useAppStore } from "@/store";
import { authMethods } from "@/store/modules/auth";
import Btn from "@globals/Btn.vue";

const store = useAppStore();

function logout() {
  document.cookie =
    "sessionCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  store.commit(authMethods.mutations.setCurrentSession);
  router.push("/");
}
</script>

<template>
  <router-link to="/">
    <Btn @click="logout" title="Exit">
      <template #icon><Logout width="16" /></template>
    </Btn>
  </router-link>
</template>
