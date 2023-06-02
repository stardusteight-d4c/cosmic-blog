<script setup lang="ts">
import PostCard from '@globals/PostCard.vue'
import { Star } from '@/components/@globals/atoms/icons'
import { starredPostsStyles as css } from './styles'

defineProps({
  favoriteAmount: {
    type: Number,
  },
})
</script>

<template>
  <div :class="css.columnSpanWrapper">
    <div :class="css.headerContainer">
      <h3 :class="css.title">Starred {{ favoriteAmount }}</h3>
      <Star width="24" height="24" color="#f2f2f280" />
    </div>
    <div :class="css.starredPostsWrapper">
      <div class="blur animate-pulse">
        <PostCard :isMinimalist="true" />
      </div>
      <PostCard :isMinimalist="true" />
      <PostCard :isMinimalist="true" />
    </div>
  </div>
</template>
