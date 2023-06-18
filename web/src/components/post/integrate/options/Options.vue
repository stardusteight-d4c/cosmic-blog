<script setup lang="ts">
import { ProgressBar, Scale, Opacity, BackToTop } from ".";
import { optionsStyles as css } from "../styles";
</script>

<template>
  <div :class="css.wrapper">
    <Opacity />
    <Scale />
    <ProgressBar />
    <BackToTop />
  </div>
</template>
