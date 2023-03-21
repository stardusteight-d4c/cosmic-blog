<script setup lang="ts">
import { Options } from './integrate'
</script>

<template>
  <div
    class="bg-[#1a1a1a] relative text-[#F2F2F2] h-fit overflow-hidden w-screen"
  >
    <portal-target name="deletePopUp"></portal-target>
    <Options />
    <slot name="navbar"></slot>
    <div class="max-w-[725px] w-full mx-auto mb-28">
      <slot name="main"></slot>
    </div>
  </div>
</template>
