<script setup lang="ts">
import { computed } from "vue";
import {
  RichTextEditor,
  PreviewPost,
  BaseLayoutSlot,
} from "@/components/create-post";
import { useAppStore } from "@store/index";
import router from "@/router";

const store = useAppStore();
const showPreview = computed(() => store.state.editor.showPreview);
const session = computed(() => store.state.auth.session);
if (session.value.decodedToken?.type !== "author") {
  router.push("/");
}
</script>

<template>
  <BaseLayoutSlot v-if="session.decodedToken?.type === 'author'">
    <template #main>
      <RichTextEditor v-show="!showPreview" />
      <PreviewPost v-show="showPreview" />
    </template>
  </BaseLayoutSlot>
</template>
