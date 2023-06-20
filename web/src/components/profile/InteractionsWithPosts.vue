<script setup lang="ts">
import { useAppStore } from "@/store";
import { StarredPosts, CommentedPosts } from "./integrate";
import { interactionsWithPostsStyles as css } from "./styles";
import { computed } from "vue";
import { useRoute } from "vue-router";

const store = useAppStore();
const userData = computed(() => store.state.profile.user);
const route = useRoute();
const userId = route.params.id as string;
</script>

<template>
  <div :class="css.wrapper">
    <StarredPosts :userId="userId" :favoriteAmount="userData.favoriteAmount!" />
    <CommentedPosts :userId="userId" :commentAmount="userData.commentAmount" />
  </div>
</template>
