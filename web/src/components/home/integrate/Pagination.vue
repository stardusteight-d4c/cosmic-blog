<script setup lang="ts">
import { Arrow } from "@/components/@globals/atoms/icons";
import { paginationStyles as css } from "./styles";

interface IProps {
  posts: IPostResponse[];
  currentPage: number;
  back: () => Promise<void>;
  next: () => Promise<void>;
}

defineProps<IProps>();
</script>

<template>
  <div v-if="posts.length === 0">
    <span :class="css.span"> There are no posts yet </span>
  </div>
  <div :class="css.wrapper">
    <Arrow
      v-if="currentPage > 0"
      @click="back"
      width="42"
      height="42"
      :class="css.arrowLeft"
    />
    <span id="home-current-page" :class="css.pageCount">{{ currentPage }}</span>
    <Arrow
      v-if="posts && posts.length === 6"
      @click="next"
      width="42"
      height="42"
      :class="css.arrowRight"
    />
  </div>
</template>
