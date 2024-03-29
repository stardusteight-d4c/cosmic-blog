<script setup lang="ts">
import { PostComment } from ".";
import { Arrow, Chat } from "@/components/@globals/atoms/icons";
import { commentedPostsStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { computed, onMounted, ref } from "vue";
import { profileMethods } from "@/store/modules/profile";

defineProps({
  commentAmount: {
    type: Number,
  },
  userId: {
    type: String,
    required: true,
  },
});

const store = useAppStore();
const commentedPosts = computed(() => store.state.profile.commentedPosts);
const user = computed(() => store.state.profile.user);
const loading = ref(false);
const currentPage = ref(0);

onMounted(async () => {
  try {
    await store.dispatch(profileMethods.actions.getCommentedPosts, {
      userId: user.value.id,
      skip: 0,
    });
    loading.value = false;
  } catch (error) {
    console.error("Error loading user data:", error);
    loading.value = false;
  }
});

async function handleNextPage() {
  if (commentedPosts.value.length === 3) {
    loading.value = true;
    currentPage.value++;
    await store.dispatch(profileMethods.actions.getCommentedPosts, {
      userId: user.value.id,
      skip: currentPage.value * 3,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

async function handleBackPage() {
  if (currentPage.value > 0) {
    loading.value = true;
    currentPage.value--;
    await store.dispatch(profileMethods.actions.getCommentedPosts, {
      userId: user.value.id,
      skip: currentPage.value * 3,
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}
</script>

<template>
  <div :class="css.columnSpanWrapper">
    <div :class="css.headerContainer">
      <h3 :class="css.title">Comments {{ commentAmount }}</h3>
      <Chat width="24" height="24" color="#f2f2f280" />
    </div>
    <div
      v-if="!(currentPage === 0 && commentedPosts.length === 0)"
      class="flex items-center relative mt-4 w-full overflow-visible justify-end text-[#7c7c7c]"
    >
      <Arrow
        @click="handleBackPage"
        v-if="currentPage !== 0"
        width="42"
        height="42"
        class="cursor-pointer absolute -left-1 hover:text-[#b8b8b8] p-1 rotate-180 antialiased"
      />
      <span
        class="text-2xl mx-1 font-semibold absolute left-1/2 -translate-x-1/2"
        >{{ currentPage }}</span
      >
      <Arrow
        @click="handleNextPage"
        v-if="commentedPosts.length >= 3"
        width="42"
        height="42"
        class="cursor-pointer absolute -right-1 hover:text-[#b8b8b8] p-1 antialiased"
      />
    </div>
    <div :class="css.commentedPostsWrapper">
      <PostComment
        :class="`${loading && 'blur-sm brightness-95 animate-pulse'}`"
        v-if="commentedPosts && commentedPosts.length > 0"
        v-for="comment in commentedPosts"
        :slug="comment.post.slug"
        :title="comment.post.title"
        :postedAt="comment.postedAt"
        :username="comment.owner.username"
        :content="comment.content"
      />
    </div>
    <div
      v-if="commentedPosts && commentedPosts.length === 0"
      class="flex items-center justify-center w-full"
    >
      <span
        class="block md:font-medium text-center md:text-xl mt-8 text-[#f2f2f2]/70"
      >
        There are no commented posts
      </span>
    </div>
  </div>
</template>
