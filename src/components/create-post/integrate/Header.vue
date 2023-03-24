<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useAppStore } from '@store/index'
import { MUTATION_SEED_TEXT_EDITOR_DATA } from '@store/mutations'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils/html-ids'
import type { IHeadArticleData } from '@interfaces/article'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

const store = useAppStore()

const tag = ref('')
const fileUploaded = ref<FileList | null>(null)

const editorData: IHeadArticleData = reactive({
  coverImage: '',
  title: '',
  tags: [],
  date: new Date(),
})

watch(editorData, (newVal, _oldVal): void => {
  const payload = {
    coverImage: newVal.coverImage,
    title: newVal.title,
    tags: newVal.tags,
    date: newVal.date,
  }
  store.commit(MUTATION_SEED_TEXT_EDITOR_DATA, payload)
})

function onFileChange(event: Event): void {
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
    fileUploaded.value = files
    reader.onload = () => {
      const base64 = reader.result
      editorData.coverImage = String(base64)
    }
  }
}

function handleTags(): void {
  if (tag.value.length > 10 || tag.value.length < 3) {
    window.alert('As tags devem conter entre 3 e 10 caracteres')
    return
  }
  if (editorData.tags.length === 4) {
    window.alert('Você atingiu o limite de tags')
    return
  }
  editorData.tags.push(tag.value)
  tag.value = ''
}

function onClickUpload(): void {
  const inputFile = document.getElementById(ids.inputFile)!
  const clickEvent = new MouseEvent('click', { bubbles: true })
  inputFile.dispatchEvent(clickEvent)
}

function onKeyDownInTagInput(event: KeyboardEvent): void {
  if (event.key === 'Backspace' && tag.value === '') {
    editorData.tags.pop()
  }
}
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="outer">
      <button
        v-on:click="onClickUpload"
        :class="`${
          fileUploaded
            ? 'bg-gradient-to-t from-blue-500 to-violet-500'
            : 'bg-[#f2f2f2]/5'
        }  active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3`"
      >
        <span
          v-if="fileUploaded"
          class="whitespace-nowrap flex items-center gap-x-2"
          >Uploaded Image</span
        >
        <span v-else>Add a cover image</span>
      </button>
    </div>
    <span
      v-if="fileUploaded"
      class="truncate text-[#F2F2F2]/50 w-full max-w-[500px]"
      >{{ fileUploaded[0].name }}</span
    >
  </div>
  <input
    type="file"
    class="hidden"
    :id="ids.inputFile"
    accept="image/png, image/jpeg"
    @change="onFileChange"
  />

  <input
    type="text"
    v-model="editorData.title"
    placeholder="New post title here..."
    class="bg-[#1a1a1a] shadow-inner shadow-black/50 p-2 outline-none placeholder:text-[#F2F2F2]/30 text-2xl mt-4 w-full"
  />
  <div class="flex items-center mt-4">
    <span
      v-for="(tag, index) in editorData.tags"
      :key="index"
      class="shadow-black/50 whitespace-nowrap shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
      >{{ tag }}</span
    >
    <input
      type="text"
      placeholder="Add up to 4 tags..."
      @keydown.enter="handleTags"
      v-model="tag"
      @keydown="onKeyDownInTagInput"
      class="w-full bg-transparent text-base outline-none placeholder:text-[#F2F2F2]/30"
    />
  </div>
</template>
