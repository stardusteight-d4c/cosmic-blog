<script setup lang="ts">
import { ProgressBar, Scale, Align, Opacity } from '.'
</script>

<template>
  <div
    class="flex z-[1000] flex-col items-end justify-end gap-y-4 w-fit h-fit fixed bottom-4 right-4"
  >
    <Opacity />
    <Align />
    <Scale />
    <ProgressBar />
  </div>
</template>
