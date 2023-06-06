<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :disabled="disabled"
  >
    <slot name="icon"></slot>
    {{ title }}
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  gap: 4px;
  font-size: 16px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 12px;
  border-radius: 999px;
  margin-top: 4px;
  transition: all 0.5s ease;
}

button:active:not(:disabled) {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:disabled {
  cursor: not-allowed;
  filter: brightness(0.8);
  transition: none;
}

button:hover:not(:disabled) {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
