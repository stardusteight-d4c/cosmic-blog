<script setup lang="ts">
import PostCard from "@globals/PostCard.vue";
import { Arrow, Star } from "@/components/@globals/atoms/icons";
import { starredPostsStyles as css } from "./styles";
import { computed } from "vue";
import { useAppStore } from "@/store";
import { onMounted, ref } from "vue";
import { profileMethods } from "@/store/modules/profile";

interface IProps {
  favoriteAmount: number;
  userId: string;
}

const props = defineProps<IProps>();
const store = useAppStore();
const favoritedPosts = computed(() => store.state.profile.favoritedPosts);
const user = computed(() => store.state.profile.user)
const loading = ref(false);
const currentPage = ref(0);

onMounted(async () => {
  try {
    await store.dispatch(profileMethods.actions.getFavoritedPosts, {
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
  if (favoritedPosts.value.length === 3) {
    loading.value = true;
    currentPage.value++;
    await store.dispatch(profileMethods.actions.getFavoritedPosts, {
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
    await store.dispatch(profileMethods.actions.getFavoritedPosts, {
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
      <h3 :class="css.title">Starred {{ favoriteAmount }}</h3>
      <Star width="24" height="24" color="#f2f2f280" />
    </div>
    <div
      v-if="!(currentPage === 0 && favoritedPosts.length === 0)"
      class="flex items-center relative mt-4 w-full overflow-visible justify-end text-[#7c7c7c]"
    >
      <Arrow
        v-if="currentPage !== 0"
        @click="handleBackPage"
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
        v-if="favoritedPosts.length >= 3"
        width="42"
        height="42"
        class="cursor-pointer absolute -right-1 hover:text-[#b8b8b8] p-1 antialiased"
      />
    </div>
    <div :class="css.starredPostsWrapper">
      <PostCard
        :class="`${loading && 'blur-sm brightness-95 animate-pulse'}`"
        v-if="favoritedPosts && favoritedPosts.length > 0"
        v-for="post in favoritedPosts"
        :postId="post.id!"
        :slug="post.slug!"
        :isMinimalist="true"
        :title="post.title"
        :postedAt="post.postedIn"
        :content="post.body"
        :tags="post.tags"
      />
    </div>
    <div
      v-if="favoritedPosts && favoritedPosts.length === 0"
      class="flex items-center justify-center w-full"
    >
      <span
        class="block text-center md:font-medium md:text-xl mt-8 text-[#f2f2f2]/70"
      >
        There are no favorite posts
      </span>
    </div>
  </div>
</template>
