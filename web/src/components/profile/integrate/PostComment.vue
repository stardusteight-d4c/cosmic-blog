<script setup lang="ts">
import { useRoute } from 'vue-router'
import { postCommentStyles as css } from './styles'

const route = useRoute()
const username = Array.isArray(route.params.username)
  ? route.params.username[0]
  : route.params.username ?? ''
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.dateSpan">2 days ago</span>
    <h2 :class="css.postTitle">
      GO! RN - Gestão de conhecimento focado em evolução do time
    </h2>
    <div :class="css.authorInfos">
      #{{ username }}
    </div>
    <p :class="css.commentParagraph">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque at et
      voluptatem iusto ex impedit quod eos asperiores placeat libero, qui dicta
      esse in, vero explicabo laboriosam sequi, cupiditate deserunt.
    </p>
  </div>
</template>
