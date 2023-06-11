<script setup lang="ts">
import { ref } from "vue";
import { Top } from "@/components/@globals/atoms/icons";
import { backToTopStyles as css } from "../styles";

const showElement = ref(false);

window.onscroll = function (): void {
  scrollFunction();
};

function scrollFunction(): void {
  const readingProgress =
    document.getElementById("readingProgress")?.textContent;
  if (Number(readingProgress) > 50) {
    showElement.value = true;
  } else {
    showElement.value = false;
  }
}

function backToTop(): void {
  const position =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (position > 0) {
    window.requestAnimationFrame(backToTop);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <div v-if="showElement" @click="backToTop" :class="css.wrapper">
    <span :class="css.span"> Back to top </span>
    <div :class="css.topIconContainer">
      <Top color="#F2F2F280" />
    </div>
  </div>
</template>
