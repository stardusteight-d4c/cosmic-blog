<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Post',
  computed: {
    postId(): string {
      return String(this.$route.params.id)
    },
  },
  setup() {
    const route = useRoute()
    const id =  route.params.id

    
  },
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>
