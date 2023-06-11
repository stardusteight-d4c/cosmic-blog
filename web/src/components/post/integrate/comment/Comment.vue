<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { detectClickOutsideElement } from "@/utils";
import { Edit, Trash } from "@globals/atoms/icons";
import Btn from "@globals/Btn.vue";
import { commentStyles as css } from "../styles";
import dayjs from "dayjs";
import { useAppStore } from "@/store";
import { IComment } from "@/@interfaces/comment";
import { useRoute } from "vue-router";
import { postMethods } from "@/store/modules/post";
import { DeleteCommentPopUp } from "@/components/pop-ups";

// Quando o usuário clicar em seu comentário em Profile redirecioanar para o post e seu comentário
// Inserir dinâmicamente uma propriedade ID no wrapper do comentário com o id do Comentário no Banco de Dados
// http://localhost:5173/post/455446461/#IDdoComentário

interface IProps {
  comment: IComment;
  currentPage: number;
}

const props = defineProps<IProps>();

const store = useAppStore();
const route = useRoute();
const edit = ref();
const commentEditableElement = ref<HTMLTextAreaElement | null>(null);
const commentElement = ref<HTMLDivElement | null>(null);
const textareaHeight = ref("");
const selectedEditComment = ref(false);
const proceedToDelete = ref(false);
const currentSession = computed(() => store.state.auth.session.decodedToken);
const postId = route.params.id as string;

onMounted((): void => {
  const comment = document.getElementById(`comment-${props.comment.id}`)!;
  edit.value = comment.innerText;
  document.addEventListener("click", handleClickOutsideOfEdit);
  commentElement.value = document.getElementById(
    `comment-${props.comment.id}`
  )! as HTMLDivElement;
  commentEditableElement.value = document.getElementById(
    `textarea-${props.comment.id}`
  )! as HTMLTextAreaElement;
});

onUnmounted((): void => {
  document.removeEventListener("click", handleClickOutsideOfEdit);
});

function adjustTextarea(): void {
  nextTick(() => {
    const textarea = document.getElementById(`textarea-${props.comment.id}`)!;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    textareaHeight.value = `${textarea.scrollHeight}px`;
  });
}

function showCommentTextarea(): void {
  selectedEditComment.value = !selectedEditComment.value;
  const commentDivHeight = commentElement.value!.offsetHeight;
  if (!selectedEditComment) return;
  commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`;
}

async function editComment() {
  const textarea = document.getElementById(
    `textarea-${props.comment.id}`
  )! as HTMLTextAreaElement;
  const comment = document.getElementById(`comment-${props.comment.id}`)!;
  const editValue = textarea.value;
  comment.innerText = editValue;
  selectedEditComment.value = false;
  const updatedComment: IComment = {
    ...props.comment,
    content: editValue,
  };
  await store.dispatch(postMethods.actions.updateComment, updatedComment);
}

function closedDeletePopUp(): void {
  proceedToDelete.value = false;
}

function handleClickOutsideOfEdit(event: MouseEvent): void {
  const { clickedOutside, elementCliked } = detectClickOutsideElement(
    event,
    props.comment.id!
  );
  const elementToExclude = commentEditableElement.value;
  if (
    clickedOutside &&
    selectedEditComment.value === true &&
    elementCliked !== elementToExclude
  ) {
    selectedEditComment.value = false;
  }
}
</script>

<template>
  <div :id="comment.id" :class="css.wrapper">
    <div :class="css.contentCotainer">
      <div :class="css.header">
        <div :class="css.authorInfosContainer">
          <RouterLink
            :to="`/profile/${comment.owner.id}`"
            class="flex items-center cursor-pointer"
          >
            <img :src="comment.owner.avatar" :class="css.authorImage" />
            <h3 :class="css.authorName">#{{ comment.owner.username }}</h3>
          </RouterLink>
          <span class="text-sm ml-1 -mt-[10px] text-[#f2f2f280] cursor-default"
            >| {{ dayjs(comment.postedAt).format("D[/]MMM[, ]YYYY") }}</span
          >
        </div>
        <div :class="css.operationsContainer">
          <Edit
            v-if="currentSession?.user_id === comment.owner.id"
            @click="showCommentTextarea"
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
        @input="adjustTextarea"
      />
      <Btn
        @click="editComment"
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
      >
        {{ comment.content }}
      </div>
    </div>
  </div>
</template>
