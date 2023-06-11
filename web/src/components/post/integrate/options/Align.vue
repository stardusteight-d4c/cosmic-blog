<script setup lang="ts">
import { ref } from "vue";
import { AlignLeft, AlignJustify } from "@/components/@globals/atoms/icons";
import { alignStyles as css } from "../styles";

const textAlign = ref<"left" | "justify" | "center">("left");

function handleTextAlign(): void {
  const htmlBody = document.getElementById("htmlBody")!;
  if (textAlign.value === "left") {
    textAlign.value = "justify";
    htmlBody.style.textAlign = "justify";
  } else if (textAlign.value === "justify") {
    textAlign.value = "left";
    htmlBody.style.textAlign = "left";
  }
}

function handleSpanText(): false | "Align Justify" | "Align Left" {
  return (
    (textAlign.value === "justify" && "Align Justify") ||
    (textAlign.value === "left" && "Align Left")
  );
}
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.span">
      {{ handleSpanText() }}
    </span>
    <div @click="handleTextAlign" :class="css.alignIconContainer">
      <AlignJustify v-if="textAlign === 'justify'" color="#F2F2F280" />
      <AlignLeft v-else color="#F2F2F280" />
    </div>
  </div>
</template>
