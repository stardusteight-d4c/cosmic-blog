<script lang="ts">
import { defineComponent } from 'vue'
import AppLogo from '@/atoms/icons/AppLogo.vue'

export default defineComponent({
  name: 'ProfileButton',
  components: { AppLogo },
})
</script>

<template>
  <router-link to="/profile/stardusteight" class="cursor-pointer p-2">
    <div class="relative w-8">
      <div class="spinner">
        <div class="spinner1" />
      </div>
      <AppLogo width="24" height="24" class="absolute top-0" />
    </div>
  </router-link>
</template>

<style scoped>
.spinner {
  background-image: linear-gradient(#8b5cf6 35%, #3b82f6);
  width: 24px;
  height: 24px;
  animation: spinning82341 1.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px #8b5cf6, 0px 5px 20px 0px #3b82f6;
}

.spinner1 {
  background-color: rgb(36, 36, 36);
  width: 24px;
  height: 24px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}
</style>
