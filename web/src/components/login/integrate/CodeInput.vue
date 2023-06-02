<script setup lang="ts">
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  pastedCode: {
    type: Array,
    required: true,
  },
})

function onBackspace(event: KeyboardEvent) {
  if (props.index != 1) {
    const backInput = props.index - 1
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement
    currentInputElement.value = ''
    const inputElement = document.getElementById(`input-${backInput}`)
    inputElement!.focus()
  } else if (props.index === 1) {
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement
    currentInputElement.value = ''
  }
}

function onInputIsFilled() {
  if (props.index != 6) {
    const nextInputId = props.index + 1
    const nextInputElement = document.getElementById(
      `input-${nextInputId}`
    ) as HTMLInputElement
    const currentInputElement = document.getElementById(
      `input-${props.index}`
    ) as HTMLInputElement
    if (!isNaN(Number(currentInputElement.value))) {
      nextInputElement!.focus()
    }
  }
}
</script>

<template>
  <span
    class="w-full h-full relative min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] bg-black/50 rounded-md text-4xl text-white font-bold flex items-center justify-center"
  >
    <input
      :id="`input-${index}`"
      type="text"
      maxlength="1"
      :value="pastedCode && pastedCode[index - 1]"
      @keydown.backspace.prevent="onBackspace"
      @input="onInputIsFilled"
      oninput="this.value = this.value.replace(/[^0-9]/g, '')"
      class="bg-transparent text-center text-white text-5xl cursor-pointer absolute inset-0 w-full h-full outline-none z-50"
    />
  </span>
</template>

<style scoped></style>
