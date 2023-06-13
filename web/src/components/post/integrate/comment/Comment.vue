<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { Edit, Trash } from "@globals/atoms/icons";
import Btn from "@globals/Btn.vue";
import { commentStyles as css } from "../styles";
import dayjs from "dayjs";
import { useAppStore } from "@/store";
import { IComment } from "@/@interfaces/comment";
import { DeleteCommentPopUp } from "@/components/pop-ups";
import { CommentFunctions } from "@/functions/CommentFunctions";

interface IProps {
  comment: IComment;
  currentPage: number;
}

const props = defineProps<IProps>();

const store = useAppStore();
const edit = ref();
const commentEditableElement = ref<HTMLTextAreaElement | null>(null);
const commentElement = ref<HTMLDivElement | null>(null);
const textareaHeight = ref("");
const selectedEditComment = ref(false);
const proceedToDelete = ref(false);
const currentSession = computed(() => store.state.auth.session.decodedToken);

const functions = new CommentFunctions({
  commentId: props.comment.id!,
  commentElement,
  commentEditableElement,
  selectedEditComment,
});
const refs = {
  textareaHeight,
};

onMounted((): void => {
  const comment = document.getElementById(`comment-${props.comment.id}`)!;
  edit.value = comment.innerText;
  document.addEventListener("click", (e) =>
    functions.handleClickOutsideOfEdit(e)
  );
  commentElement.value = document.getElementById(
    `comment-${props.comment.id}`
  )! as HTMLDivElement;
  commentEditableElement.value = document.getElementById(
    `textarea-${props.comment.id}`
  )! as HTMLTextAreaElement;
});

onUnmounted((): void => {
  document.removeEventListener("click", (e) =>
    functions.handleClickOutsideOfEdit(e)
  );
});

function closedDeletePopUp(): void {
  proceedToDelete.value = false;
}
</script>

<template>
  <div :id="comment.id" :class="css.wrapper">
    <div :class="css.contentCotainer">
      <div :class="css.header">
        <div :class="css.authorInfosContainer">
          <RouterLink
            :to="`/profile/${comment.owner.id}`"
            :class="css.profileLinkContainer"
          >
            <img :src="comment.owner.avatar" :class="css.authorImage" />
            <h3 :class="css.authorName">#{{ comment.owner.username }}</h3>
          </RouterLink>
          <span :class="css.commentDate"
            >| {{ dayjs(comment.postedAt).format("D[/]MMM[, ]YYYY") }}</span
          >
        </div>
        <div :class="css.operationsContainer">
          <Edit
            v-if="currentSession?.user_id === comment.owner.id"
            @click="functions.showCommentTextarea()"
            width="24"
            height="24"
            :class="css.handleEdit(selectedEditComment)"
          />
          <Trash
            v-if="currentSession?.user_id === comment.owner.id"
            @click="proceedToDelete = true"
            width="24"
            height="24"
            :class="css.handleDelete(proceedToDelete)"
          />
          <DeleteCommentPopUp
            :commentId="comment.id!"
            :currentPage="currentPage"
            v-if="proceedToDelete"
            @closedDeletePopUp="closedDeletePopUp"
          />
        </div>
      </div>
      <textarea
        :id="`textarea-${comment.id}`"
        :spellcheck="false"
        :class="css.textareaEdit"
        v-show="selectedEditComment"
        :value="edit"
        @input="
          functions.adjustTextarea({
            textareaHeight: refs.textareaHeight,
          })
        "
      />
      <Btn
        @click="
          functions.editComment({
            propsComment: comment,
          })
        "
        title="Update"
        v-show="selectedEditComment"
        :class="css.btnSubmit"
      >
        <template #icon
          ><Edit width="18" height="18" :class="css.btnIcon"
        /></template>
        Update
      </Btn>
      <div
        :id="`comment-${comment.id}`"
        v-show="!selectedEditComment"
        :class="css.commentContainer"
        style="white-space: break-spaces; word-wrap: break-word"
      >
        {{ comment.content }}
      </div>
    </div>
  </div>
</template>
