<script setup lang="ts">
import { useAppStore } from "@/store";
import PostCard from "../@globals/PostCard.vue";
import { computed, ref } from "vue";
import { postMethods } from "@/store/modules/post";
import { useRoute } from "vue-router";
import { resultsStyles as css } from "./styles";

const store = useAppStore();
const route = useRoute();
const posts = computed(() => store.state.post.filteringPosts);
const tag = route.query.equals;
const page = ref(1);
const postsResponse = ref(true);

window.onscroll = () => {
  if (
    Math.ceil(window.innerHeight + window.scrollY) >=
    Math.ceil(document.body.offsetHeight)
  ) {
    nextPage();
    page.value = page.value + 1;
  }
};

async function nextPage() {
  const payload = {
    tag,
    skip: page.value * 6,
  };
  if (postsResponse.value) {
    await store
      .dispatch(postMethods.actions.getFilteringPosts, payload)
      .then((posts) =>
        posts.length === 6
          ? (postsResponse.value = true)
          : (postsResponse.value = false)
      );
  }
}
</script>

<template>
  <main :class="css.wrapper">
    <h1 :class="css.title">Results:</h1>
    <div v-if="posts.length > 0" :class="css.container">
      <PostCard
        v-for="post in posts"
        :class="css.resultCard"
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
    <div v-else :class="css.span">No posts found!</div>
    <div v-if="postsResponse === false" :class="css.span">End of results!</div>
  </main>
</template>
