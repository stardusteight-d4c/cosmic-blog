<script setup lang="ts">
import { ref, reactive, watch, toRaw } from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import SavePopUp from '@/components/pop-ups/SavePopUp.vue'

const emit = defineEmits(['showPreview'])
// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

// Fazer toda preview do post recebendo os dados do rich text editor
// Salvar os dados do editor em localstorage

// definir as variaveis do post em um objeto
const iconStyle = {
  weight: 'fill',
  class: `p-2 text-[#F2F2F2] text-[35px] md:text-[42refpx] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
}
const tag = ref('')
const selectedTags = reactive<Array<string>>([])
const textContent = ref('')
const coverImage = ref<FileList | null>(null)
const inputFile = ref()
const title = ref('')
const date = new Date()
const textarea = ref<HTMLTextAreaElement>()
const proceedToSave = ref(false)

const editorData: {
  tags: Array<string>
  coverImage: string
  title: string
  date: Date
  body: string
} = reactive({
  tags: [],
  coverImage: '',
  title: title.value,
  date: date,
  body: textContent,
})

// Debugging reasons
// watch(editorData, (newVal, oldVal) => {
//   console.log('Preview props changed:', { ...newVal })
// })

function handleSelected(type: string) {
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, type)
}
function insertTab(event: KeyboardEvent) {
  event.preventDefault()
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, 'tab')
}
function closedSavePopUpObserver() {
  proceedToSave.value = false
}
function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files as FileList
  const maxFileSize = 3 * 1024 * 1024 // 3MB
  const file = files[0]
  if (file && file.size > maxFileSize) {
    alert('O arquivo selecionado é maior do que 3MB')
    input.value = ''
  } else {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    coverImage.value = files
    reader.onload = () => {
      const base64 = reader.result
      editorData.coverImage = String(base64)
    }
  }
}
function handleTags() {
  if (tag.value.length > 10 || tag.value.length < 3) {
    window.alert('As tags devem conter entre 3 e 10 caracteres')
    return
  }
  if (selectedTags.length === 4) {
    window.alert('Você atingiu o limite de tags')
    return
  }
  selectedTags.push(tag.value)
  editorData.tags.push(tag.value)
  tag.value = ''
}

const onClickUpload = () => {
  const clickEvent = new MouseEvent('click', { bubbles: true })
  inputFile.value.dispatchEvent(clickEvent)
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Backspace' && tag.value === '') {
    selectedTags.pop()
    editorData.tags.pop()
  }
}
function getSave() {
  const savedText = localStorage.getItem('saveText')
  if (!savedText) {
    return
  }
  textarea.value!.value = savedText
}

function handleShowPreview() {
  const payload = {
    tags: toRaw(editorData.tags),
    coverImage: editorData.coverImage,
    title: editorData.title,
    date: editorData.date,
    body: editorData.body,
  }
  emit('showPreview', payload)
}
</script>

<template>
  <div
    class="text-[#F2F2F2] bg-[#252525] h-auto w-full overflow-hidden rounded-sm p-4"
  >
    <!-- HEADER START -->
    <!-- Upload Image -->
    <div class="flex items-center gap-x-2">
      <div class="outer">
        <button
          v-on:click="onClickUpload"
          :class="`${
            coverImage
              ? 'bg-gradient-to-t from-blue-500 to-violet-500'
              : 'bg-[#f2f2f2]/5'
          }  active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3`"
        >
          <span
            v-if="coverImage"
            class="whitespace-nowrap flex items-center gap-x-2"
            >Uploaded Image</span
          >
          <span v-else>Add a cover image</span>
        </button>
      </div>
      <span
        v-if="coverImage"
        class="truncate text-[#F2F2F2]/50 w-full max-w-[500px]"
        >{{ coverImage[0].name }}</span
      >
    </div>
    <input
      type="file"
      class="hidden"
      ref="inputFile"
      accept="image/png, image/jpeg"
      @change="onFileChange"
    />

    <!-- Title input -->

    <input
      type="text"
      v-model="editorData.title"
      placeholder="New post title here..."
      class="bg-[#1a1a1a] shadow-inner shadow-black/50 p-2 outline-none placeholder:text-[#F2F2F2]/30 text-2xl mt-4 w-full"
    />
    <div class="flex items-center mt-4">
      <span
        v-for="(tag, index) in selectedTags"
        :key="index"
        class="shadow-black/50 whitespace-nowrap shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
        >{{ tag }}</span
      >
      <input
        type="text"
        placeholder="Add up to 4 tags..."
        @keydown.enter="handleTags"
        v-model="tag"
        @keydown="onKeyDown"
        class="w-full bg-transparent text-base outline-none placeholder:text-[#F2F2F2]/30"
      />
    </div>

    <!-- HEADER END -->

    <div class="w-full h-full rounded-lg mt-4">
      <div
        class="flex items-center bg-[#F2F2F2]/5 justify-between gap-2 p-2 rounded-sm"
      >
        <div class="flex items-center">
          <ph-text-bolder
            v-on:click="handleSelected('bold')"
            v-bind="iconStyle"
          />
          <ph-text-italic
            v-on:click="handleSelected('italic')"
            :weight="iconStyle.weight"
            :class="iconStyle.class + ' hidden md:block'"
          />
          <ph-text-underline
            v-on:click="handleSelected('underline')"
            :weight="iconStyle.weight"
            :class="iconStyle.class + ' hidden md:block'"
          />
          <ph-link v-on:click="handleSelected('link')" v-bind="iconStyle" />
          <ph-image v-on:click="handleSelected('image')" v-bind="iconStyle" />
          <ph-code
            v-on:click="handleSelected('code-block')"
            v-bind="iconStyle"
          />
          <ph-text-h-two
            v-on:click="handleSelected('heading-two')"
            v-bind="iconStyle"
          />
          <ph-quotes
            v-on:click="handleSelected('quotes')"
            :weight="iconStyle.weight"
            :class="iconStyle.class + ' hidden md:block'"
          />
          <ph-text-align-left
            v-on:click="handleSelected('align-left')"
            v-bind="iconStyle"
          />
          <ph-text-align-center
            v-on:click="handleSelected('align-center')"
            v-bind="iconStyle"
          />
          <ph-text-align-right
            v-on:click="handleSelected('align-right')"
            v-bind="iconStyle"
          />
        </div>
        <div class="flex items-center">
          <ph-eye @click="handleShowPreview" v-bind="iconStyle" />
          <ph-floppy-disk
            v-on:click="proceedToSave = true"
            v-bind="iconStyle"
          />
          <SavePopUp
            v-if="proceedToSave"
            @closedSavePopUp="closedSavePopUpObserver"
          />

          <ph-download-simple v-on:click="getSave" v-bind="iconStyle" />
        </div>
      </div>
      <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
        <textarea
          ref="textarea"
          id="textarea"
          :spellcheck="false"
          v-model="textContent"
          @keydown.tab.prevent="insertTab"
          class="min-h-[230px] bg-[#1a1a1a] shadow-inner shadow-black/50 p-4 h-full py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
        />
      </div>
    </div>
    <button class="button">Submit</button>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  margin-left: auto;
  margin-top: 4px;
  border-radius: 999px;
  transition: all 0.5s ease;
}

.button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

.button:hover {
  transform: scale(1.1);
}

.button svg {
  width: 16px;
}
</style>
