<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { DeletePopUp } from '@/components/pop-ups'
import { detectClickOutsideElement } from '@/utils'
import { Edit, Trash } from '@globals/atoms/icons'
import Btn from '@globals/Btn.vue'
import { commentStyles as css } from './styles'
import dayjs from 'dayjs'
import { useAppStore } from '@/store'
import { IComment } from '@/@interfaces/comment'
import { useRoute } from 'vue-router'

// Quando o usuário clicar em seu comentário em Profile redirecioanar para o post e seu comentário
// Inserir dinâmicamente uma propriedade ID no wrapper do comentário com o id do Comentário no Banco de Dados
// http://localhost:5173/post/455446461/#IDdoComentário

interface IProps {
  id: string
  ownerId: string
  username: string
  content: string
  postedAt: Date
  avatarUrl: string
  currentPage: number
}

const props = defineProps<IProps>()

const store = useAppStore()
const route = useRoute()
const edit = ref()
const commentEditableElement = ref<HTMLTextAreaElement | null>(null)
const commentElement = ref<HTMLDivElement | null>(null)
const textareaHeight = ref('')
const selectedEditComment = ref(false)
const proceedToDelete = ref(false)
const currentSession = computed(() => store.state.auth.session.decodedToken)
const postId = route.params.id as string

onMounted((): void => {
  const comment = document.getElementById(
    `comment-${props.id}`
  )! 
  edit.value = comment.innerText
  document.addEventListener('click', handleClickOutsideOfEdit)
  commentElement.value = document.getElementById(
    `comment-${props.id}`
  )! as HTMLDivElement
  commentEditableElement.value = document.getElementById(
    `textarea-${props.id}`
  )! as HTMLTextAreaElement
})
onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutsideOfEdit)
})

function adjustTextarea(): void {
  nextTick(() => {
    const textarea = document.getElementById(`textarea-${props.id}`)!
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    textareaHeight.value = `${textarea.scrollHeight}px`
  })
}

function showCommentTextarea(): void {
  selectedEditComment.value = !selectedEditComment.value
  const commentDivHeight = commentElement.value!.offsetHeight
  if (!selectedEditComment) return
  commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`
}

function editComment() {
  const textarea = document.getElementById(
    `textarea-${props.id}`
  )! as HTMLTextAreaElement
  const editValue = textarea.value
  // const updatedComment: IComment = {
  //   id: props.id,
  //   content: editValue,
  //   postedAt: props.postedAt,
  //   postId,
  //   postTitle: props.
  // }
}

function closedDeletePopUp(): void {
  proceedToDelete.value = false
}

function handleClickOutsideOfEdit(event: MouseEvent): void {
  const { clickedOutside, elementCliked } = detectClickOutsideElement(
    event,
    props.id
  )
  const elementToExclude = commentEditableElement.value
  if (
    clickedOutside &&
    selectedEditComment.value === true &&
    elementCliked !== elementToExclude
  ) {
    selectedEditComment.value = false
  }
}
</script>

<template>
  <div :id="id" :class="css.wrapper">
    <div :class="css.contentCotainer">
      <div :class="css.header">
        <div :class="css.authorInfosContainer">
          <RouterLink
            :to="`/profile/${ownerId}`"
            class="flex items-center cursor-pointer"
          >
            <img :src="avatarUrl" :class="css.authorImage" />
            <h3 :class="css.authorName">#{{ username }}</h3>
          </RouterLink>
          <span class="text-sm ml-1 -mt-[10px] text-[#f2f2f280] cursor-default"
            >| {{ dayjs(postedAt).format('D[/]MMM[, ]YYYY') }}</span
          >
        </div>
        <div :class="css.operationsContainer">
          <Edit
            v-if="currentSession?.user_id === ownerId"
            @click="showCommentTextarea"
            width="24"
            height="24"
            :class="css.handleEdit(selectedEditComment)"
          />
          <Trash
            v-if="currentSession?.user_id === ownerId"
            @click="proceedToDelete = true"
            width="24"
            height="24"
            :class="css.handleDelete(proceedToDelete)"
          />
          <DeletePopUp
            :commentId="id"
            :currentPage="currentPage"
            v-if="proceedToDelete"
            @closedDeletePopUp="closedDeletePopUp"
          />
        </div>
      </div>
      <textarea
        :id="`textarea-${id}`"
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
        :id="`comment-${id}`"
        v-show="!selectedEditComment"
        :class="css.commentContainer"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>
