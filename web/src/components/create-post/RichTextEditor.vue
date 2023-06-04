<script setup lang="ts">
import { Header, Editor } from './integrate'
import Btn from '../@globals/Btn.vue'
import { richTextEditorStyles as css } from './styles'
import { useAppStore } from '@/store'
import { computed } from 'vue'
import ShortUniqueId from 'short-unique-id'
import { uploadImageToFirebase } from '@/utils/uploadImageToFirebase'

const store = useAppStore()

async function submitPost() {
  const editorData = computed(() => store.state.article.textEditorData)
  console.log('editorData', editorData.value);
  
  console.log('editorData', editorData.value)
  const uid = new ShortUniqueId({ length: 10 })
  const fileName = uid()
  const publicImageURL = await uploadImageToFirebase(
    editorData.value.coverImage,
    fileName
  )
  // const payload: IPostObject = {
  //   title: editorData.value.title,
  //   body: editorData.value.body,
  //   tags: editorData.value.tags,
  //   postedIn: new Date(),
  //   coverImage: publicImageURL,
  //   author: {

  //   }
  // }
}
</script>

<template>
  <div :class="css.wrapper">
    <Header />
    <Editor />
    <Btn @click="submitPost" title="Submit" class="ml-auto" />
  </div>
</template>
