<script setup lang="ts">
import { useRoute } from "vue-router";
import { Navbar } from "../navbar";

const route = useRoute();
const tag = route.query.equals;
</script>

<template>
  <div class="bg-[#1a1a1a] pb-[100px] text-[#F2F2F2] w-screen">
    <Navbar :path="`filtering posts by ${tag}`" />
    <div class="max-w-[725px] w-full mx-auto">
      <slot name="main"></slot>
    </div>
  </div>
</template>
