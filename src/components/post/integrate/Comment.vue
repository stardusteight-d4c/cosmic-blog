<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import DeletePopUp from './DeletePopUp.vue'
import { Edit } from '@/components/globals/atoms/icons'
import memoji from '@/assets/my-memoji02.png'
import Btn from '@/components/globals/Btn.vue'
// Quando o usuário clicar em seu comentário em Profile redirecioanar para o post e seu comentário
// Inserir dinâmicamente uma propriedade ID no wrapper do comentário com o id do Comentário no Banco de Dados
// http://localhost:5173/post/455446461/#IDdoComentário

const selectedEditComment = ref(false)
const edit = ref(
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut consequatur temporibus, possimus mollitia voluptates ratione maxime voluptatibus labore accusantium unde nulla reiciendis explicabo tempore dolor totam a consequuntur adipisci.'
)
const commentEditableElement = ref<HTMLTextAreaElement | null>(null)
const commentElement = ref<HTMLDivElement | null>(null)
const textareaHeight = ref('')
const proceedToDelete = ref(false)

function adjustTextarea() {
  nextTick(() => {
    const textarea = document.getElementById(ids.commentTextarea)!
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    textareaHeight.value = `${textarea.scrollHeight}px`
  })
}

function showCommentTextarea() {
  selectedEditComment.value = !selectedEditComment.value
  const commentDivHeight = commentElement.value!.offsetHeight
  if (!selectedEditComment) return
  commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`
}

function closedDeletePopUpObserver() {
  proceedToDelete.value = false
}

onMounted(() => {
  commentElement.value = document.getElementById(
    ids.commentDiv
  )! as HTMLDivElement
  commentEditableElement.value = document.getElementById(
    ids.commentTextarea
  )! as HTMLTextAreaElement
})
</script>

<template>
  <div class="mt-14 bg-[#252525] rounded-sm p-4">
    <div class="flex flex-col items-start w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center cursor-pointer">
          <img :src="memoji" class="w-16 h-16 -ml-4 -mt-4" />
          <h3 class="text-lg font-semibold -mt-3">#Stardusteight</h3>
        </div>
        <div class="-mt-[10px] flex items-center gap-x-2 text-[#7c7c7c]">
          <Edit
            @click="showCommentTextarea"
            width="24"
            height="24"
            :class="{
              'text-blue-500': selectedEditComment,
              'p-[2px] cursor-pointer': true,
            }"
          />
          <ph-trash-simple
            @click="proceedToDelete = true"
            :size="24"
            class="p-[2px] cursor-pointer"
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
        class="scrollHiddenCSO scrollHideenIEF h-auto border-blue-500 border bg-[#1a1a1a] resize-none block p-2 w-full mt-1 rounded-sm outline-none"
        v-show="selectedEditComment"
        :value="edit"
        @input="adjustTextarea"
      />
      <Btn title="Update" v-show="selectedEditComment">
        <template #icon><Edit class="mt-[1px]" /></template>
        Update
      </Btn>
      <div
        :id="ids.commentDiv"
        v-show="!selectedEditComment"
        class="block bg-[#1a1a1a] p-2 w-full mt-1 rounded-sm"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut
        consequatur temporibus, possimus mollitia voluptates ratione maxime
        voluptatibus labore accusantium unde nulla reiciendis explicabo tempore
        dolor totam a consequuntur adipisci.
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollHiddenCSO::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.scrollHideenIEF {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-left: auto;
  font-size: 14px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 2px 8px;
  border-radius: 999px;
  margin-top: 4px;
  transition: all 0.5s ease;
}

button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:hover {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
