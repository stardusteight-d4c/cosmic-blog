<script setup lang="ts">
import { postCommentStyles as css } from './styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

defineProps({
  postedAt: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div :class="css.wrapper">
    <span :class="css.dateSpan">{{ dayjs(postedAt).fromNow()  }}</span>
    <h2 :class="css.postTitle">
      {{ title }}
    </h2>
    <div :class="css.authorInfos">
      #{{ username }}
    </div>
    <p :class="css.commentParagraph">
      {{ content }}
    </p>
  </div>
</template>
