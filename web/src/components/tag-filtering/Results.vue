<script setup lang="ts">
import { useAppStore } from "@/store";
import PostCard from "../@globals/PostCard.vue";
import { computed } from "vue";

const store = useAppStore();
const posts = computed(() => store.state.post.filteringPosts);
</script>
<!-- Fazer paginação por scroll -->
<template>
  <main class="px-2 md:px-0">
    <h1 class="text-2xl font-medium opacity-50 mb-4">Results:</h1>
    <div
      v-if="posts.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
    >
      <PostCard
        v-for="post in posts"
        class="col-span-1"
        :slug="post.slug!"
        :postId="post.id!"
        :title="post.title"
        :cover="post.coverImage"
        :postedAt="post.postedAt"
        :content="post.body"
        :tags="post.tags"
        full="true"
      />
    </div>
    <div v-else class="text-2xl md:text-3xl mt-16 opacity-50 font-bold text-center w-full">
      No posts found!
    </div>
  </main>
</template>

<style scoped></style>
