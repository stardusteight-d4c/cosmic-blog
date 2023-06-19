<script setup lang="ts">
import { useRoute } from "vue-router";
import { Navbar } from "../navbar";
import { baseLayoutSlotStyles as css } from "./styles";

const route = useRoute();
const tag = route.query.equals;
</script>

<template>
  <div :class="css.wrapper">
    <Navbar :path="`filtering: ${tag}`" />
    <div :class="css.mainContainer">
      <slot name="main"></slot>
    </div>
  </div>
</template>
