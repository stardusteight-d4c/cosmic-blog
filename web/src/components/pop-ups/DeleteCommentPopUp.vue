<script setup lang="ts">
import { XCircle } from "@/components/@globals/atoms/icons";
import { BaseLayoutSlot } from ".";
import { deletePopUpStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { post, postMethods } from "@/store/modules/post";
import { useRoute } from "vue-router";

interface IProps {
  commentId: string;
  ownerId: string;
  currentPage: number;
}

const props = defineProps<IProps>();

const emit = defineEmits(["closedDeletePopUp"]);
const route = useRoute();
const store = useAppStore();
const postId = route.params.id;

async function handleDelete() {
  await store.dispatch(postMethods.actions.deleteComment, {
    commentId: props.commentId,
    ownerId: props.ownerId,
    postId,
    skip: props.currentPage * 4,
  });
  emit("closedDeletePopUp");
  setTimeout(() => {
    const element = document.getElementById("comments")!;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, 100);
}

function handleCancel() {
  emit("closedDeletePopUp");
}
</script>

<template>
  <portal to="deleteCommentPopUp">
    <BaseLayoutSlot>
      <template #content>
        <XCircle width="48" height="48" :class="css.XCircleIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will delete your comment and cannot be undone.</span
        >
      </template>
      <template #operations>
        <button @click="handleDelete" :class="css.BtnDelete">Delete</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
