<script setup lang="ts">
import PostCard from '@globals/PostCard.vue'
import GalleryHeader from './integrate/GalleryHeader.vue'
import Pagination from './integrate/Pagination.vue'
import { postGalleryStyles as css } from './styles'
</script>

<template>
  <GalleryHeader />
  <div :class="css.wrapper">
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
    <PostCard :full="true" />
  </div>
  <Pagination />
</template>
