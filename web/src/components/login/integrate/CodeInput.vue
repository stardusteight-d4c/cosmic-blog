<script setup lang="ts">
import { codeInputStyles as css } from "./styles";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  pastedCode: {
    type: Array,
    required: true,
  },
});

function onBackspace(event: KeyboardEvent) {
  if (props.index != 1) {
    const backInput = props.index - 1;
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement;
    currentInputElement.value = "";
    const inputElement = document.getElementById(`input-${backInput}`);
    inputElement!.focus();
  } else if (props.index === 1) {
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement;
    currentInputElement.value = "";
  }
}

function onInputIsFilled() {
  if (props.index != 6) {
    const nextInputId = props.index + 1;
    const nextInputElement = document.getElementById(
      `input-${nextInputId}`
    ) as HTMLInputElement;
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement;
    if (!isNaN(Number(currentInputElement.value))) {
      nextInputElement!.focus();
    }
  }
}
</script>

<template>
  <span :class="css.wrapper">
    <input
      :id="`input-${index}`"
      type="text"
      maxlength="1"
      :value="pastedCode && pastedCode[index - 1]"
      @keydown.backspace.prevent="onBackspace"
      @input="onInputIsFilled"
      oninput="this.value = this.value.replace(/[^0-9]/g, '')"
      :class="css.input"
    />
  </span>
</template>
