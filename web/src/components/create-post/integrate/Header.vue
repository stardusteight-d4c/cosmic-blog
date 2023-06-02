<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { useAppStore } from '@store/index'
import { MUTATION_SEED_TEXT_EDITOR_DATA } from '@store/mutations'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils'
import useNotificator from '@/hooks/Notificator'
import { headerStyles as css } from './styles'
import { IHeadArticleData } from '@/store/modules/article/@interfaces'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

const store = useAppStore()
const { notify } = useNotificator()

const tag = ref<string>('')
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
    notify('ERROR', 'The selected file is larger than 3MB!')
    input.value = ''
  } else {
    const reader = new FileReader()
    fileUploaded.value = files
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      editorData.coverImage = String(base64)
    }
  }
}

function handleTags(): void {
  if (tag.value.length > 15 || tag.value.length < 3) {
    notify('WARNING', 'Tags must contain between 3 and 15 characters.')
    return
  }
  if (editorData.tags.length === 4) {
    notify('WARNING', 'You have reached the tag limit.')
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
  <div :class="css.wrapper">
    <div>
      <button
        v-on:click="onClickUpload"
        :class="css.handleUploadBtn(fileUploaded)"
      >
        <span v-if="fileUploaded" :class="css.uploadedSpan"
          >Uploaded Image</span
        >
        <span v-else>Add a cover image</span>
      </button>
    </div>
    <span v-if="fileUploaded" :class="css.fileName">{{
      fileUploaded[0].name
    }}</span>
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
    :class="css.titleInput"
  />
  <div :class="css.tagsContainer">
    <span v-for="(tag, index) in editorData.tags" :key="index" :class="css.tag"
      >#{{ tag }}</span
    >
    <input
      type="text"
      placeholder="Add up to 4 tags..."
      @keydown.enter="handleTags"
      v-model="tag"
      @keydown="onKeyDownInTagInput"
      :class="css.tagInput"
    />
  </div>
</template>
