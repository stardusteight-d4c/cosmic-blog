<script setup lang="ts">
import { PostComment } from '.'
import { Chat } from '@/components/@globals/atoms/icons'
import { commentedPostsStyles as css } from './styles'
</script>

<template>
  <div :class="css.columnSpanWrapper">
    <div :class="css.headerContainer">
      <h3 :class="css.title">Comments</h3>
      <Chat width="24" height="24" color="#f2f2f280" />
    </div>
    <div :class="css.commentedPostsWrapper">
      <PostComment />
      <PostComment />
      <PostComment />
    </div>
  </div>
</template>
