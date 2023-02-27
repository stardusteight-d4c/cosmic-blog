<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router';

export default defineComponent({
    name: "App",
    components: { RouterView }
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
