<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import 'prismjs/themes/prism.css'

export default defineComponent({
  name: 'App',
  components: { RouterView },
})
</script>

<template>
  <RouterView />
</template>
