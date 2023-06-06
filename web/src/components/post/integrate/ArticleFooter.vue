<script setup lang="ts">
import { Chat, Star } from '@/components/@globals/atoms/icons'
import { articleFooterStyles as css } from './styles'
import { useAppStore } from '@/store'
import { computed } from 'vue'

const store = useAppStore()
const favoriteAmount = computed(() => store.state.post.post?.favoriteAmount)
const commentAmount = computed(() => store.state.post.post?.commentAmount)
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.iconContainer">
      <Star :class="css.icon" /> {{ favoriteAmount }} Starred
    </span>
    <span :class="css.dividerSpan">|</span>
    <span :class="css.iconContainer">
      <Chat :class="css.icon" /> {{ commentAmount }} Comments
    </span>
  </div>
</template>
