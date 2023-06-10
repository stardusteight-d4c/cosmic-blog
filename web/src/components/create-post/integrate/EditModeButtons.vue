<script setup lang="ts">
import Btn from '@globals/Btn.vue'
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import { uploadImageToFirebase } from '@/utils/uploadImageToFirebase'
import { editorMethods } from '@/store/modules/editor'
import { DeletePostPopUp } from '@/components/pop-ups'
import ShortUniqueId from 'short-unique-id'
import { editModeButtonsStyles as css } from './styles'

const store = useAppStore()
const editMode = computed(() => store.state.editor.editMode)
const session = computed(() => store.state.auth.session)
const editorData = computed(() => store.state.editor.richTextEditor)
const proceedToDelete = ref(false)

function onClosedDeletePopUp(): void {
  proceedToDelete.value = false
}

function handleCancelEdit() {
  store.commit(editorMethods.mutations.setEditMode, false)
  store.commit(editorMethods.mutations.setRichTextEditor, {
    postId: undefined,
    tags: [],
    coverImage: '',
    title: '',
    date: new Date(),
    body: '',
  })
}

async function updatePost() {
  let coverImage = editorData.value.coverImage
  if (!editorData.value.coverImage.includes("https://")) {
    const uid = new ShortUniqueId({ length: 10 })
    const fileName = uid()
    const publicImageURL = await uploadImageToFirebase(
      editorData.value.coverImage,
      fileName
    )
    coverImage = publicImageURL
  }
  const post = {
    id: editorData.value.postId,
    title: editorData.value.title,
    body: editorData.value.body,
    tags: editorData.value.tags,
    postedIn: editorData.value.date,
    coverImage: coverImage,
    author: {
      id: session.value.decodedToken!.user_id,
      email: session.value.decodedToken!.email,
    },
  }
  await store.dispatch(editorMethods.actions.updatePost, post)
  store.commit(editorMethods.mutations.setRichTextEditor, {
    postId: undefined,
    tags: [],
    coverImage: '',
    title: '',
    date: new Date(),
    body: '',
  })
  store.commit(editorMethods.mutations.setEditMode, false)
}
</script>

<template>
  <DeletePostPopUp v-if="proceedToDelete" :postId="editorData.postId" @closedDeletePopUp="onClosedDeletePopUp" />
  <div v-if="editMode" :class="css.wrapper">
    <button @click="handleCancelEdit" :class="css.cancelBtn">
      Cancel
    </button>
    <button @click="proceedToDelete = true" :class="css.deleteBtn">
      Delete
    </button>
    <Btn @click="updatePost" title="Update" :class="css.updateBtn" />
  </div>
</template>
