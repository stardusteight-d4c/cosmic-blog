<script setup lang="ts">
import Pen from '@globals/atoms/icons/Pen.vue'
import Btn from '@globals/Btn.vue'
</script>

<template>
  <router-link to="/create-post">
    <Btn title="New">
      <template #icon><Pen width="16" /></template>
    </Btn>
  </router-link>
</template>
