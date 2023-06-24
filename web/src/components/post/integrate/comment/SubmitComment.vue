<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Btn from "@globals/Btn.vue";
import Send from "@globals/atoms/icons/Send.vue";
import { useAppStore } from "@/store";
import { getAvatarUrlById, getAvatarUrls } from "@/utils";
import { SubmitCommentFunctions } from "@/functions/CommentFunctions";
import { submitCommentStyles as css } from "../styles";

const emit = defineEmits(["submitComment"]);

const comment = ref("");
const countCharacters = ref(0);

watch(comment, (newValue) => {
  countCharacters.value = newValue.length;
});

const isGuest = computed(() => store.state.post.post?.isGuest ?? true);
const store = useAppStore();
const session = computed(() => store.state.auth.session);
const urls = ref(getAvatarUrls(session.value.decodedToken?.avatarId ?? ""))
const userAvatar = getAvatarUrlById(session.value.decodedToken?.avatarId ?? "");
const handledAvatarString = userAvatar?.replace(/-\d+\.png$/, "-")!;
const postId = computed(() => store.state.post.post!.id!);
const postTitle = computed(() => store.state.post.post!.title!);
const postSlug = computed(() => store.state.post.post!.slug!);
let currentMemoji = ref(1);

function handleMemoji(): void {
  if (currentMemoji.value < 3) {
    currentMemoji.value++;
  } else if (currentMemoji.value === 3) {
    currentMemoji.value = 1;
  }
}

const functions = new SubmitCommentFunctions({ session });
const refs = {
  emit,
  comment,
  postId,
  postTitle,
  postSlug,
  handledAvatarString,
  currentMemoji,
};
</script>

<template>
  <div v-if="!isGuest" :class="css.wrapper">
    <img
      @click="handleMemoji"
      v-bind:key="currentMemoji"
      :src="`${urls[`url${currentMemoji}`]}`"
      :class="css.memoji"
    />
    <div :class="css.contentContainer">
      <div :class="css.triangleSubmit" />
      <textarea
        v-model="comment"
        placeholder="Leave a feedback or comment about it :)"
        :spellcheck="false"
        :class="css.textarea"
      />
      <div :class="css.footerContainer">
        <span :class="css.handleCountColor(countCharacters)"
          >{{ countCharacters }}/500</span
        >
        <Btn
          @click="functions.submitComment(refs)"
          title="Submit"
          :disabled="countCharacters > 500"
        >
          <template #icon> <Send size="16" /></template>
        </Btn>
      </div>
    </div>
  </div>
</template>
