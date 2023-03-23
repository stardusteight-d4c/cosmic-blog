<script setup lang="ts">
import { Navbar } from '@/components/navbar'
</script>

<template>
<div class="bg-[#1a1a1a] min-h-screen w-screen">
    <portal-target name="savePopUp"></portal-target>
    <div class="max-w-[725px] h-full w-full mx-auto mb-8">
      <Navbar path="new" />
      <slot name="main"></slot>
    </div>
  </div>
</template>
