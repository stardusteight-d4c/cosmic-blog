<script setup lang="ts">
import Tag from "@globals/integrate/Tag.vue";
import Star from "@globals/atoms/icons/Star.vue";
import coverPlaceholder from "@/assets/cover-placeholder.webp";
import { articleHeaderStyles as css } from "./styles";
import { computed } from "vue";
import { useAppStore } from "@/store";
import { postMethods } from "@store/modules/post";

interface IProps {
  coverImage?: string;
  tags?: string[];
}

defineProps<IProps>();

const store = useAppStore();
const postId = computed(() => store.state.post.post?.id);
const isGuest = computed(() => store.state.post.post?.isGuest ?? true);
const isFavorited = computed({
  get: () => store.state.post.post?.isFavorited ?? false,
  set: (value) => store.commit(postMethods.mutations.setIsFavorited, value),
});
const userId = computed(() => store.state.auth.session.decodedToken?.user_id);

async function toggleFavorite() {
  isFavorited.value = !isFavorited.value;
  if (isFavorited.value === true) {
    store.commit(postMethods.mutations.setFavoriteAmount, true);
  } else {
    store.commit(postMethods.mutations.setFavoriteAmount, false);
  }
  await store.dispatch(postMethods.actions.toggleFavorite, {
    postId: postId.value,
    userId: userId.value,
  });
}
</script>

<template>
  <div :class="css.wrapper">
    <img
      :src="coverImage === '' ? coverPlaceholder : coverImage"
      :class="css.cover"
    />
    <div :class="css.tagsContainer">
      <Tag v-for="tag in tags" :tag="tag" />
    </div>
    <div v-if="!isGuest" :class="css.favoriteWrapper">
      <div @click="toggleFavorite" :class="css.favoriteContainer">
        <Star :class="css.starIcon(isFavorited)" />
        <div :class="css.dropDownContainer">
          <div :class="css.triangle" />
          <span>Favorite</span>
        </div>
      </div>
    </div>
  </div>
</template>
