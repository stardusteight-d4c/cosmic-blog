<script setup lang="ts">
import {
  RichTextEditor,
  PreviewPost,
  BaseLayoutSlot,
} from '@/components/create-post'
import { ref, reactive } from 'vue'

const showPreview = ref(false)
const previewPostProps = ref<any>({
  tags: '',
  coverImage: '',
  title: '',
  date: '',
  body: '',
})

function showPreviewObserver(payload: {}): void {
  if (showPreview.value === false) {
    console.log('payload', payload)
    previewPostProps.value = payload
    showPreview.value = true
  } else {
    showPreview.value = false
  }
  console.log(previewPostProps);
  
}
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <PreviewPost
        v-bind="previewPostProps"
        @backToEditor="showPreviewObserver"
        v-show="showPreview"
      />
      <RichTextEditor
        @showPreview="showPreviewObserver"
        v-show="!showPreview"
      />
    </template>
  </BaseLayoutSlot>
</template>
