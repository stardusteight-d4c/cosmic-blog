<script setup lang="ts">
import Btn from "@globals/Btn.vue";
import Arrow from "@globals/atoms/icons/Arrow.vue";
</script>

<template>
  <router-link to="/login">
    <Btn title="Login" class="text-[#F2F2F2]">
      <template #icon><Arrow width="16" /></template>
    </Btn>
  </router-link>
</template>
