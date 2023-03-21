<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '../../../utils/html-ids'
import DeletePopUp from './DeletePopUp.vue'
// Quando o usuário clicar em seu comentário em Profile redirecioanar para o post e seu comentário
// Inserir dinâmicamente uma propriedade ID no wrapper do comentário com o id do Comentário no Banco de Dados
// http://localhost:5173/post/455446461/#IDdoComentário
export default defineComponent({
  name: 'Comment',
  components: { DeletePopUp },
  setup(props, ctx) {
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
    const selectedEditComment = ref(false)
    const edit = ref(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut consequatur temporibus, possimus mollitia voluptates ratione maxime voluptatibus labore accusantium unde nulla reiciendis explicabo tempore dolor totam a consequuntur adipisci.'
    )
    const commentEditableElement = ref<HTMLTextAreaElement | null>(null)
    const commentElement = ref<HTMLDivElement | null>(null)
    const textareaHeight = ref('')
    const proceedToDelete = ref(false)

    const adjustTextarea = () => {
      nextTick(() => {
        const textarea = document.getElementById(HTML_ID.commentTextarea)!
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
        textareaHeight.value = `${textarea.scrollHeight}px`
      })
    }
    const showCommentTextarea = () => {
      selectedEditComment.value = !selectedEditComment.value
      const commentDivHeight = commentElement.value!.offsetHeight
      if (!selectedEditComment) return
      console.log(
        commentElement.value,
        commentEditableElement.value,
        commentDivHeight
      )
      commentEditableElement.value!.style.minHeight = `${commentDivHeight}px`
    }
    onMounted(() => {
      commentElement.value = document.getElementById(
        HTML_ID.commentDiv
      )! as HTMLDivElement
      commentEditableElement.value = document.getElementById(
        HTML_ID.commentTextarea
      )! as HTMLTextAreaElement
    })
    onBeforeUnmount(() => {
      watch(edit, (editNewValue) => {
        console.log(editNewValue)
      })
    })

    function closedDeletePopUpObserver() {
      proceedToDelete.value = false
    }

    return {
      selectedEditComment,
      showCommentTextarea,
      adjustTextarea,
      edit,
      proceedToDelete,
      HTML_ID,
      textareaHeight,
      closedDeletePopUpObserver,
    }
  },
})
</script>

<template>
  <div class="mt-14 bg-[#252525] rounded-sm p-4">
    <div class="flex flex-col items-start w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center cursor-pointer">
          <img
            src="../../assets/my-memoji02.png"
            class="w-16 h-16 -ml-4 -mt-4"
          />
          <h3 class="text-lg font-semibold -mt-3">#Stardusteight</h3>
        </div>
        <div class="-mt-[10px] flex items-center gap-x-2 text-[#7c7c7c]">
          <div @click="showCommentTextarea" class="cursor-pointer">
            <ph-pen-nib
              :size="24"
              :class="{
                'text-blue-500': selectedEditComment,
                'p-[2px]': true,
              }"
            />
          </div>
          <div @click="proceedToDelete = true" class="cursor-pointer">
            <ph-trash-simple :size="24" class="p-[2px]" />
            <DeletePopUp v-if="proceedToDelete" @closedDeletePopUp="closedDeletePopUpObserver" />
          </div>
        </div>
      </div>
      <textarea
        :id="HTML_ID.commentTextarea"
        :spellcheck="false"
        class="scrollHiddenCSO scrollHideenIEF h-auto border-blue-500 border bg-[#1a1a1a] resize-none block p-2 w-full mt-1 rounded-sm outline-none"
        v-show="selectedEditComment"
        :value="edit"
        @input="adjustTextarea"
      />
      <button v-show="selectedEditComment">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          class="css-i6dzq1"
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="16"
          fill="#F2F2F2"
          viewBox="0 0 256 256"
        >
          <path
            d="M240,100.68a15.86,15.86,0,0,0-4.69-11.31L166.63,20.68a16,16,0,0,0-22.63,0L115.57,49.11l-58,21.77A16.06,16.06,0,0,0,47.35,83.23L24.11,222.68A8,8,0,0,0,32,232a8.4,8.4,0,0,0,1.32-.11l139.44-23.24a16,16,0,0,0,12.35-10.17l21.77-58L235.31,112A15.87,15.87,0,0,0,240,100.68Zm-69.87,92.19L55.32,212l47.37-47.37a28,28,0,1,0-11.32-11.32L44,200.7,63.13,85.86,118,65.29,190.7,138ZM104,140a12,12,0,1,1,12,12A12,12,0,0,1,104,140Zm96-15.32L131.31,56l24-24L224,100.68Z"
          ></path>
        </svg>
        Update
      </button>
      <div
        :id="HTML_ID.commentDiv"
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
