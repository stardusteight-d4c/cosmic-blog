<script setup lang="ts">
import { ref } from "vue";
import { Lightbulb } from "@/components/@globals/atoms/icons";
import { opacityStyles as css } from "../styles";

const opacity = ref<"80" | "90" | "100">("80");

function handleOpacity(): void {
  const element = document.getElementById("htmlBody")!;
  if (opacity.value === "80") {
    element.style.color = "#F2F2F299";
    opacity.value = "90";
  } else if (opacity.value === "90") {
    element.style.color = "#CCC";
    opacity.value = "100";
  } else if (opacity.value === "100") {
    element.style.color = "#F2F2F280";
    opacity.value = "80";
  }
}

function handleSpanText():
  | false
  | "Brightness I"
  | "Brightness II"
  | "Brightness III" {
  return (
    (opacity.value === "80" && "Brightness I") ||
    (opacity.value === "90" && "Brightness II") ||
    (opacity.value === "100" && "Brightness III")
  );
}

function handleColor(): "#F2F2F299" | "#CCC" | "#F2F2F280" {
  return (
    (opacity.value === "80" && "#F2F2F280") ||
    (opacity.value === "90" ? "#F2F2F299" : "#CCC")
  );
}
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.span">
      {{ handleSpanText() }}
    </span>
    <div @click="handleOpacity" :class="css.lightbulbIconContainer">
      <Lightbulb :style="{ color: handleColor() }" />
    </div>
  </div>
</template>
