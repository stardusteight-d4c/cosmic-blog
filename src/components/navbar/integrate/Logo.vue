<script lang="ts">
import { defineComponent } from 'vue'
import AppLogo from '@/atoms/icons/AppLogo.vue'

export default defineComponent({
  name: 'Logo',
  components: { AppLogo },
})
</script>

<template>
  <router-link to="/" class="flex items-center">
    <AppLogo />
    <span class="uppercase tracking-widest font-bold text-lg lg:text-3xl"
      >Cosmic</span
    >
  </router-link>
</template>
