<script setup lang="ts">
import { XCircle } from "@/components/@globals/atoms/icons";
import { BaseLayoutSlot } from ".";
import { deletePopUpStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { editorMethods } from "@/store/modules/editor";

interface IProps {
  postId: string;
}

const props = defineProps<IProps>();

const emit = defineEmits(["closedDeletePopUp"]);
const store = useAppStore();

async function handleDelete() {
  await store.dispatch(editorMethods.actions.deletePost, props.postId);
  store.commit(editorMethods.mutations.setRichTextEditor, {
    postId: undefined,
    tags: [],
    coverImage: "",
    title: "",
    date: new Date(),
    body: "",
  });
  store.commit(editorMethods.mutations.setEditMode, false);
  emit("closedDeletePopUp");
}

function handleCancel() {
  emit("closedDeletePopUp");
}
</script>

<template>
  <portal to="deletePostPopUp">
    <BaseLayoutSlot>
      <template #content>
        <XCircle width="48" height="48" :class="css.XCircleIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will delete your post and cannot be undone.</span
        >
      </template>
      <template #operations>
        <button @click="handleDelete" :class="css.BtnDelete">Delete</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
