<script lang="ts">
import { defineComponent } from 'vue'
import ArrowRight from '../../../atoms/icons/ArrowRight.vue'

export default defineComponent({
  name: 'LoginButton',
  components: { ArrowRight },
})
</script>

<template>
  <router-link to="/login">
    <button>
      <ArrowRight />
      Login
    </button>
  </router-link>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 2px;
  transition: all 0.5s ease;
}

button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:hover {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
