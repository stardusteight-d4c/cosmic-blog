<script setup lang="ts">
import { StarredPosts, CommentedPosts } from './integrate'
import { interactionsWithPostsStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <StarredPosts />
    <CommentedPosts />
  </div>
</template>
