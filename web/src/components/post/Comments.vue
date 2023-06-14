<script setup lang="ts">
import { SubmitComment, Comment, Pagination } from "./integrate";
import { commentsStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { postMethods } from "@/store/modules/post";
import { computed, onMounted, ref, watch } from "vue";

const store = useAppStore();
const id = computed(() => store.state.post.post?.id);
onMounted(() => {
  watch(id, async (newId) => {
    await store.dispatch(postMethods.actions.getComments, {
      postId: newId,
      skip: 0,
    });
  });
});
const comments = computed(() => store.state.post.comments);
const currentPage = ref(0);
const loading = ref(false);

function onSubmitComment() {
  currentPage.value = 0;
}

async function handleNextPage() {
  if (comments.value.length >= 4) {
    loading.value = true;
    currentPage.value++;
    await store.dispatch(postMethods.actions.getComments, {
      postId: id.value,
      skip: currentPage.value * 4,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
    const element = document.getElementById("comments")!;
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
    await store.dispatch(postMethods.actions.getComments, {
      postId: id.value,
      skip: currentPage.value * 4,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
    const element = document.getElementById("comments")!;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
</script>

<template>
  <section id="comments-section">
    <h2 :class="css.title">Comments</h2>
    <SubmitComment @submitComment="onSubmitComment" />
    <div id="comments">
      <div v-for="comment in comments">
        <Comment
          :class="`${loading && 'blur-sm brightness-75 animate-pulse'}`"
          v-if="comment !== undefined"
          v-bind:key="String(comment.id)"
          v-bind:comment="comment"
          :currentPage="currentPage"
        />
      </div>
      <Pagination
        :currentPage="currentPage"
        :comments="comments"
        :back="handleBackPage"
        :next="handleNextPage"
      />
    </div>
  </section>
</template>
