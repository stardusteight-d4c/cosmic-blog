<script setup lang="ts">
import { Navbar } from "@/components/navbar";
import { baseLayoutSlotStyles as css } from "./styles";
</script>

<template>
  <div :class="css.wrapper">
    <Navbar path="home" />
    <slot name="header"></slot>
    <div :class="css.mainContent">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
