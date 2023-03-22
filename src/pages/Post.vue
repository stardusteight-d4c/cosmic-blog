<script setup lang="ts">
import { useRoute } from 'vue-router'
import { BaseLayoutSlot, Article, Comments } from '@/components/post'

const route = useRoute()
const id = route.params.id

const articleProps = {
  coverImage: '',
  tags: ['typescript', 'nodejs', 'vuejs', "nest"],
  date: new Date(),
  title: '',
  body: '',
}
</script>

<template>
  <!-- Fazer HIDE AND OPEN Options component -->
  <BaseLayoutSlot>
    <template #main>
      <Article v-bind="articleProps" />
      <Comments />
    </template>
  </BaseLayoutSlot>
</template>
