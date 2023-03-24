<script setup lang="ts">
import {
  RichTextEditor,
  PreviewPost,
  BaseLayoutSlot,
} from '@/components/create-post'
import { ref } from 'vue'

const showPreview = ref(false)

function showPreviewObserver(): void {
  if (showPreview.value === false) {
    showPreview.value = true
  } else {
    showPreview.value = false
  }
}
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <PreviewPost
        @backToEditor="showPreviewObserver"
        v-if="showPreview"
      />
      <RichTextEditor
        @showPreview="showPreviewObserver"
        v-show="!showPreview"
      />
    </template>
  </BaseLayoutSlot>
</template>
