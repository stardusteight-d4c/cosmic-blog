<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useAppStore } from '@store/index'
import { MUTATION_SEED_TEXT_EDITOR_DATA } from '@store/mutations'
import { IArticleData } from '@interfaces/index'

const store = useAppStore()

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

const inputFile = ref()
const tag = ref('')
const coverImage = ref<FileList | null>(null)
const selectedTags = ref<Array<string>>([])

const editorData = reactive({
  coverImage: '',
  title: '',
  tags: selectedTags.value,
  date: new Date(),
})

watch(editorData, (newVal, _oldVal) => {
  console.log(newVal);
  
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
    coverImage.value = files
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
  if (selectedTags.value.length === 4) {
    window.alert('Você atingiu o limite de tags')
    return
  }
  selectedTags.value.push(tag.value)
  tag.value = ''
}

function onClickUpload(): void {
  const clickEvent = new MouseEvent('click', { bubbles: true })
  inputFile.value.dispatchEvent(clickEvent)
}

function onKeyDownInTagInput(event: KeyboardEvent): void {
  if (event.key === 'Backspace' && tag.value === '') {
    selectedTags.value.pop()
  }
}
</script>

<template>
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
      @keydown="onKeyDownInTagInput"
      class="w-full bg-transparent text-base outline-none placeholder:text-[#F2F2F2]/30"
    />
  </div>
</template>
