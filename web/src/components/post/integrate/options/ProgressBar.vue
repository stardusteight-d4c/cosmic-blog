<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import DonutChart from "./DonutChart.vue";
import { progressBarStyles as css } from "../styles";

const scrollPercentage = ref(0);

onMounted((): void => {
  window.addEventListener("scroll", handleArticleReadingScrollPercentage);
});
onUnmounted((): void => {
  window.removeEventListener("scroll", handleArticleReadingScrollPercentage);
});

function handleArticleReadingScrollPercentage(): void {
  const articleBody = document.getElementById("articleBody")!;
  const computedStyle = window.getComputedStyle(articleBody);
  const matrixScale = computedStyle.getPropertyValue("transform");
  const postHeight = document.getElementById("article-post")!.clientHeight;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  if (matrixScale === "matrix(1, 0, 0, 1, 0, 0)" || matrixScale === "none") {
    const maxScrollY = postHeight * 1 - windowHeight; // +0% (default)
    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100;
    scrollPercentage.value = newScrollPercentage;
  } else if (matrixScale === "matrix(1.5, 0, 0, 1.5, 0, 0)") {
    const maxScrollY = postHeight * 1.5 - windowHeight; // +50%
    const newScrollPercentage = Math.min(scrollY / maxScrollY, 1) * 100;
    scrollPercentage.value = newScrollPercentage;
  }
}
</script>

<template>
  <div :class="css.wrapper">
    <span id="readingProgress" class="invisible">{{
      parseInt(scrollPercentage.toFixed(0))
    }}</span>
    <span :class="css.span"
      >Progress {{ parseInt(scrollPercentage.toFixed(0)) }}%
    </span>
    <div :class="css.donutChartContainer">
      <DonutChart :percentage="scrollPercentage" class="w-8" />
    </div>
  </div>
</template>
