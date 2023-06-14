<script setup lang="ts">
import { useRoute } from "vue-router";
import { BaseLayoutSlot, Article, Comments } from "@/components/post";
import { postMethods } from "@/store/modules/post";
import { computed, onMounted, ref } from "vue";
import { useAppStore } from "@/store";
import NotFound from "@/components/@globals/NotFound.vue";

const route = useRoute();
const store = useAppStore();
const slug = route.params.slug;
const post = computed(() => store.state.post.post);
const loading = ref(true);
const notFound = ref(false);

onMounted(async () => {
  try {
    const post = await store.dispatch(postMethods.actions.getPostBySlug, {
      slug,
    });
    if (!post) {
      notFound.value = true;
    }
    loading.value = false;
  } catch (error) {
    console.error("Error loading post data:", error);
    loading.value = false;
  }
});
</script>

<template>
  <BaseLayoutSlot v-if="!loading && !notFound">
    <template #main>
      <Article v-bind="post" :showFooter="true" />
      <Comments />
    </template>
  </BaseLayoutSlot>
  <NotFound v-if="notFound" />
</template>
