<script setup lang="ts">
import { Header, Editor } from './integrate'
import Btn from '../@globals/Btn.vue'
import { richTextEditorStyles as css } from './styles'
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import ShortUniqueId from 'short-unique-id'
import { uploadImageToFirebase } from '@/utils/uploadImageToFirebase'
import { authMethods } from '@/store/modules/auth'
import { editorMethods } from '@/store/modules/editor'
import { DeletePostPopUp } from '../pop-ups'

const store = useAppStore()
const editMode = computed(() => store.state.editor.editMode)
const session = computed(() => store.state.auth.session)
const editorData = computed(() => store.state.editor.textEditorData)
const proceedToDelete = ref(false)

function closedDeletePopUp(): void {
  proceedToDelete.value = false
}

function handleCancelEdit() {
  store.commit(editorMethods.mutations.SET_EDIT_MODE, false)
  store.commit(editorMethods.mutations.TEXT_EDITOR_DATA, {
    postId: undefined,
    tags: [],
    coverImage: '',
    title: '',
    date: new Date(),
    body: '',
  })
}

async function updatePost() {
  const post = {
    id: editorData.value.postId,
    title: editorData.value.title,
    body: editorData.value.body,
    tags: editorData.value.tags,
    postedIn: editorData.value.date,
    coverImage: editorData.value.coverImage,
    author: {
      id: session.value.decodedToken!.user_id,
      email: session.value.decodedToken!.email,
    },
  }
  await store.dispatch(editorMethods.actions.UPDATE_POST, post)
  store.commit(editorMethods.mutations.TEXT_EDITOR_DATA, {
    postId: undefined,
    tags: [],
    coverImage: '',
    title: '',
    date: new Date(),
    body: '',
  })
  store.commit(editorMethods.mutations.SET_EDIT_MODE, false)
}

async function submitPost() {
  store.commit(authMethods.mutations.CURRENT_SESSION)
  const uid = new ShortUniqueId({ length: 10 })
  const fileName = uid()
  // const publicImageURL = await uploadImageToFirebase(
  //   editorData.value.coverImage,
  //   fileName
  // )
  const post = {
    title: editorData.value.title,
    body: editorData.value.body,
    tags: editorData.value.tags,
    postedIn: new Date(),
    coverImage: 'publicImageURL',
    author: {
      id: session.value.decodedToken!.user_id,
      email: session.value.decodedToken!.email,
    },
  }
  await store.dispatch(editorMethods.actions.PUBLISH_POST, post)
}
</script>

<template>
  <div :class="css.wrapper">
    <DeletePostPopUp
      v-if="proceedToDelete"
      :postId="editorData.postId"
      @closedDeletePopUp="closedDeletePopUp"
    />
    <Header />
    <Editor />
    <div
      v-if="editMode"
      class="flex items-center justify-end w-fit gap-x-1 ml-auto"
    >
      <button
        @click="handleCancelEdit"
        class="bg-gray-500/50 rounded-full py-1 px-4 mt-1"
      >
        Cancel
      </button>
      <button
        @click="proceedToDelete = true"
        class="bg-red-500 rounded-full py-1 px-4 mt-1"
      >
        Delete
      </button>
      <Btn @click="updatePost" title="Update" class="ml-auto" />
    </div>
    <Btn v-if="!editMode" @click="submitPost" title="Submit" class="ml-auto" />
  </div>
</template>

<style scoped></style>
