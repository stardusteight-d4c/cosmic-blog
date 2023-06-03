<script setup lang="ts">
import { useAppStore } from '@/store'
import { StarredPosts, CommentedPosts } from './integrate'
import { interactionsWithPostsStyles as css } from './styles'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useAppStore()
const userData = computed(() => store.state.user.userData)
const route = useRoute()
const userId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id
</script>

<template>
  <div :class="css.wrapper">
    <StarredPosts :userId="userId" :favoriteAmount="userData.favoriteAmount" />
    <CommentedPosts :userId="userId" :commentAmount="userData.commentAmount" />
  </div>
</template>
