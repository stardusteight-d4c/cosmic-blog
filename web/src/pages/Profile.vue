<script setup lang="ts">
import {
  InteractionsWithPosts,
  UserPresentation,
  BaseLayoutSlot,
} from '@/components/profile'
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <UserPresentation />
      <InteractionsWithPosts />
    </template>
  </BaseLayoutSlot>
</template>
