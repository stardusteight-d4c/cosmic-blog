<script setup lang="ts">
import { ref } from "vue";
import { ArrowsIn, ArrowsOut } from "@/components/@globals/atoms/icons";
import { scaleStyles as css } from "../styles";

const scaleUp = ref(false);
const marginBottomArticleBody = 112;

function handleScale(): void {
  scaleUp.value = !scaleUp.value;
  const { heightIncrease, marginTopOnScaleUp } = computedMarginTopOnScaleUp();
  const commentsSection = document.getElementById("comments-section")!;
  const articleBody = document.getElementById("articleBody")!;
  if (scaleUp.value === true) {
    commentsSection.style.marginTop = `${marginTopOnScaleUp}px`;
    articleBody.style.transform = "scale(1.5)";
    articleBody.style.marginTop = "-200px";
    articleBody.style.transformOrigin = "top";
    articleBody.style.marginBottom = `${
      marginBottomArticleBody + heightIncrease
    }px`;
  } else {
    commentsSection.style.marginTop = "0px";
    articleBody.style.transform = "scale(1)";
    articleBody.style.marginTop = "0";
    articleBody.style.marginBottom = "112px";
  }
}

function computedMarginTopOnScaleUp(): {
  heightIncrease: number;
  marginTopOnScaleUp: number;
} {
  const articleBody = document.getElementById("articleBody")!;
  const originalHeight = articleBody?.clientHeight;
  const heightOnScaleUp = originalHeight * 1.5; // 50%
  const heightIncrease = heightOnScaleUp - originalHeight;
  const marginTop = heightIncrease + marginBottomArticleBody;
  const marginTopOnScaleUp = marginTop;
  return { heightIncrease, marginTopOnScaleUp };
}

function handleSpanText(): "Scale Up" | "Scale Down" {
  return scaleUp.value ? "Scale Up" : "Scale Down";
}
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.span">
      {{ handleSpanText() }}
    </span>
    <div @click="handleScale" :class="css.scaleIconContainer">
      <ArrowsIn v-if="!scaleUp" />
      <ArrowsOut v-else />
    </div>
  </div>
</template>
