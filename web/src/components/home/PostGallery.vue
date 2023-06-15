<script setup lang="ts">
import PostCard from "@globals/PostCard.vue";
import GalleryHeader from "./integrate/GalleryHeader.vue";
import Pagination from "./integrate/Pagination.vue";
import { postGalleryStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { computed, ref } from "vue";
import { postMethods } from "@store/modules/post";

const store = useAppStore();
const posts = computed(() => store.state.post.home);
const currentPage = ref(0);
const loading = ref(false);

async function handleNextPage() {
  if (posts.value.length === 6) {
    loading.value = true;
    currentPage.value++;
    await store.dispatch(postMethods.actions.getHomePosts, {
      skip: currentPage.value * 6,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
    const element = document.getElementById("post-gallery")!;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}

async function handleBackPage() {
  if (currentPage.value > 0) {
    loading.value = true;
    currentPage.value--;
    await store.dispatch(postMethods.actions.getHomePosts, {
      skip: currentPage.value * 6,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
    const element = document.getElementById("post-gallery")!;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
</script>

<template>
  <GalleryHeader />
  <div :class="css.wrapper">
    <PostCard
      :class="`${loading && 'blur-sm brightness-75 animate-pulse'}`"
      v-for="post in posts"
      :slug="post.slug!"
      :postId="post.id!"
      :title="post.title"
      :cover="post.coverImage"
      :postedAt="post.postedAt"
      :content="post.body"
      :tags="post.tags"
      :full="true"
    />
  </div>
  <Pagination
    :posts="posts"
    :currentPage="currentPage"
    :back="handleBackPage"
    :next="handleNextPage"
  />
</template>
