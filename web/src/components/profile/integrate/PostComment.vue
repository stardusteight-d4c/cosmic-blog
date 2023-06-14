<script setup lang="ts">
import { postCommentStyles as css } from "./styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface IProps {
  slug: string
  postedAt: Date;
  title: string;
  username: string;
  content: string;
}

defineProps<IProps>();
</script>

<template>
  <router-link :to="`/post/${slug}`" :class="css.wrapper">
    <span :class="css.dateSpan">{{ dayjs(postedAt).fromNow() }}</span>
    <h2 :class="css.postTitle">
      {{ title }}
    </h2>
    <div :class="css.authorInfos">#{{ username }}</div>
    <p :class="css.commentParagraph">
      {{ content }}
    </p>
  </router-link>
</template>
