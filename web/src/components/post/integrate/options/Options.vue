<script setup lang="ts">
import { ProgressBar, Scale, Align, Opacity, BackToTop } from ".";
import { optionsStyles as css } from "../styles";
</script>

<template>
  <div :class="css.wrapper">
    <Opacity />
    <Align />
    <Scale />
    <ProgressBar />
    <BackToTop />
  </div>
</template>
