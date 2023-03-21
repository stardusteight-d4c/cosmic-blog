<script setup lang="ts">
import { useRoute } from 'vue-router'
import Navbar from '@/components/navbar/Navbar.vue'
import { BaseLayoutSlot, Article, Comments } from '@/components/post'

const route = useRoute()
const id = route.params.id

const articleProps = {
  coverImage: '',
  tags: [''],
  date: new Date(),
  title: '',
  body: '',
}
</script>

<template>
  <BaseLayoutSlot>
    <template #navbar>
      <Navbar path="home" />
    </template>
    <template #main>
      <Article v-bind="articleProps" />
      <Comments />
    </template>
  </BaseLayoutSlot>
</template>
