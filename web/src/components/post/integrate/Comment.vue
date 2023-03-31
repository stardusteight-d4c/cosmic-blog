<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { DeletePopUp } from '@/components/pop-ups'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import { Edit, Trash } from '@globals/atoms/icons'
import memoji from '@/assets/my-memoji02.png'
import Btn from '@globals/Btn.vue'
import { detectClickOutsideElement } from '@/utils/detect-click-outside-element'
import { commentStyles as css } from './styles'

// Quando o usuário clicar em seu comentário em Profile redirecioanar para o post e seu comentário
// Inserir dinâmicamente uma propriedade ID no wrapper do comentário com o id do Comentário no Banco de Dados
// http://localhost:5173/post/455446461/#IDdoComentário

const edit = ref(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut consequatur temporibus, possimus mollitia voluptates ratione maxime voluptatibus labore accusantium unde nulla reiciendis explicabo tempore dolor totam a consequuntur adipisci.'
)
const commentEditableElement = ref<HTMLTextAreaElement | null>(null)
const commentElement = ref<HTMLDivElement | null>(null)
const textareaHeight = ref('')
const selectedEditComment = ref(false)
const proceedToDelete = ref(false)

onMounted((): void => {
  document.addEventListener('click', handleClickOutsideOfEdit)
  commentElement.value = document.getElementById(
    ids.commentDiv
  )! as HTMLDivElement
  commentEditableElement.value = document.getElementById(
    ids.commentTextarea
  )! as HTMLTextAreaElement
})
onUnmounted((): void => {
  document.removeEventListener('click', handleClickOutsideOfEdit)
})

function adjustTextarea(): void {
  nextTick(() => {
    const textarea = document.getElementById(ids.commentTextarea)!
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

function closedDeletePopUpObserver(): void {
  proceedToDelete.value = false
}

function handleClickOutsideOfEdit(event: MouseEvent): void {
  const { clickedOutside, elementCliked } = detectClickOutsideElement(
    event,
    ids.editComment
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
  <div :class="css.wrapper">
    <div :class="css.contentCotainer">
      <div :class="css.header">
        <div :class="css.authorInfosContainer">
          <img :src="memoji" :class="css.authorImage" />
          <h3 :class="css.authorName">#Stardusteight</h3>
        </div>
        <div :class="css.operationsContainer">
          <Edit
            :id="ids.editComment"
            @click="showCommentTextarea"
            width="24"
            height="24"
            :class="css.handleEdit(selectedEditComment)"
          />
          <Trash
            @click="proceedToDelete = true"
            width="24"
            height="24"
            :class="css.handleDelete(proceedToDelete)"
          />
          <DeletePopUp
            v-if="proceedToDelete"
            @closedDeletePopUp="closedDeletePopUpObserver"
          />
        </div>
      </div>
      <textarea
        :id="ids.commentTextarea"
        :spellcheck="false"
        :class="css.textareaEdit"
        v-show="selectedEditComment"
        :value="edit"
        @input="adjustTextarea"
      />
      <Btn title="Update" v-show="selectedEditComment" :class="css.btnSubmit">
        <template #icon
          ><Edit width="18" height="18" :class="css.btnIcon"
        /></template>
        Update
      </Btn>
      <div
        :id="ids.commentDiv"
        v-show="!selectedEditComment"
        :class="css.commentContainer"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut
        consequatur temporibus, possimus mollitia voluptates ratione maxime
        voluptatibus labore accusantium unde nulla reiciendis explicabo tempore
        dolor totam a consequuntur adipisci.
      </div>
    </div>
  </div>
</template>
