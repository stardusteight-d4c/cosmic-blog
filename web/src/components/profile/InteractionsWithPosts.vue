<script setup lang="ts">
import { useAppStore } from '@/store'
import { StarredPosts, CommentedPosts } from './integrate'
import { interactionsWithPostsStyles as css } from './styles'
import { computed } from 'vue'

const store = useAppStore()
const userData = computed(() => store.state.user.userData)
</script>

<template>
  <div :class="css.wrapper">
    <StarredPosts :favoriteAmount="userData.favoriteAmount" />
    <CommentedPosts :commentAmount="userData.commentAmount" />
  </div>
</template>
