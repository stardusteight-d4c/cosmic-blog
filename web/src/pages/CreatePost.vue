<script setup lang="ts">
import { computed } from 'vue'
import {
  RichTextEditor,
  PreviewPost,
  BaseLayoutSlot,
} from '@/components/create-post'
import { useAppStore } from '@store/index'

const store = useAppStore()
const showPreview = computed(() => store.state.editor.showPreview)
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <RichTextEditor v-show="!showPreview" />
      <PreviewPost v-show="showPreview" />
    </template>
  </BaseLayoutSlot>
</template>
