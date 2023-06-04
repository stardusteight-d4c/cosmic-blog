<script setup lang="ts">
import PostCard from '@globals/PostCard.vue'
import GalleryHeader from './integrate/GalleryHeader.vue'
import Pagination from './integrate/Pagination.vue'
import { postGalleryStyles as css } from './styles'
import { useAppStore } from '@/store'
import { computed } from 'vue'

const store = useAppStore()
const posts = computed(() => store.state.post.home)
console.log(posts.value);

</script>

<template>
  <GalleryHeader />
  <div :class="css.wrapper">
    <PostCard
      v-for="post in posts"
      :title="post.title"
      :postedAt="post.postedIn"
      :content="post.body"
      :tags="post.tags"
      :full="true"
    />
  </div>
  <Pagination />
</template>
