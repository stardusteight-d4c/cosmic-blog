<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
import { useAppStore } from '@store/index'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils'
import useNotificator from '@/hooks/Notificator'
import { headerStyles as css } from './styles'
import { editorMethods } from '@/store/modules/editor'
import { postMethods } from '@/store/modules/post'
import { IPostResponse } from '@/@interfaces/post'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

const store = useAppStore()
const { notify } = useNotificator()
const term = ref('')
const editMode = computed(() => store.state.editor.editMode)
const posts = ref<IPostResponse[]>([])
const tag = ref<string>('')
const fileUploaded = ref<FileList | null>(null)
const fileUploadedOnEditMode = ref<FileList | null>(null)
const editorData = computed(() => store.state.editor.richTextEditor)

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
    if (editMode.value === true) {
      fileUploadedOnEditMode.value = files
    } else {
      fileUploaded.value = files
    }
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result
      editorData.value.coverImage = String(base64)
    }
  }
}

function handleTags(): void {
  if (tag.value.length > 15 || tag.value.length < 3) {
    notify('WARNING', 'Tags must contain between 3 and 15 characters.')
    return
  }
  if (editorData.value.tags.length === 4) {
    notify('WARNING', 'You have reached the tag limit.')
    return
  }
  editorData.value.tags.push(tag.value)
  tag.value = ''
}

function onClickUpload(): void {
  const inputFile = document.getElementById(ids.inputFile)!
  const clickEvent = new MouseEvent('click', { bubbles: true })
  inputFile.dispatchEvent(clickEvent)
}

function onKeyDownInTagInput(event: KeyboardEvent): void {
  if (event.key === 'Backspace' && tag.value === '') {
    editorData.value.tags.pop()
  }
}

async function search() {
  if (term.value.length > 3) {
    posts.value = await store.dispatch(postMethods.actions.SEARCH_BY_TITLE, {
      title: term.value,
    })
  }
}

function handleSelectedToEdit(post: IPostResponse) {
  store.commit(editorMethods.mutations.setEditMode, true)
  fileUploaded.value = null
  posts.value = []
  term.value = ''
  // const textareaEditorElement = document.getElementById(
  //   'textareaEditor'
  // )! as HTMLTextAreaElement
  // textareaEditorElement.value = post.body
  console.log(post.postedIn)

  editorData.value.postId = post.id
  editorData.value.coverImage = post.coverImage
  editorData.value.title = post.title
  editorData.value.tags = post.tags
  editorData.value.coverImage = post.coverImage
  editorData.value.date = new Date(post.postedIn)
  editorData.value.body = post.body
  store.commit(editorMethods.mutations.setRichTextEditor, editorData.value)
}
</script>

<template>
  <div>
    <input
      @input="search"
      type="text"
      v-model="term"
      :placeholder="`Search for a post`"
      class="inner-shadow-input mb-4 text-[#f2f2f2] bg-[#252525] outline-none w-full md:max-w-[250px] py-1 px-[10px] rounded-sm border border-transparent focus:border-blue-500 transition-all"
    />
    <ul
      :class="`${
        posts.length > 0 ? 'block' : 'hidden'
      } absolute -mt-4 bg-[#161616] shadow-black/50 shadow-md text-white w-full md:max-w-[250px] `"
    >
      <li
        v-for="post in posts"
        class="p-1 hover:bg-white/10 cursor-pointer"
        @click="handleSelectedToEdit(post)"
      >
        {{ post.title }}
      </li>
    </ul>
  </div>
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
    <span v-if="fileUploaded && !editMode" :class="css.fileName">{{
      fileUploaded[0].name
    }}</span>
    <span v-if="editMode" :class="css.fileName">{{
      (fileUploaded && fileUploaded[0].name) ?? editorData.coverImage
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
