<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Controls } from '.'
import { handleMarkdown, HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils'
import { editorStyles as css } from './styles'
import { useAppStore } from '@/store'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

onMounted((): void => {
  textarea.value = document.getElementById(
    ids.textareaEditor
  )! as HTMLTextAreaElement
})

const store = useAppStore()
const textarea = ref<HTMLTextAreaElement>()
const editorData = computed(() => store.state.editor.richTextEditor)
function insertTab(event: KeyboardEvent): void {
  event.preventDefault()
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, 'tab')
}
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.controlsContainer">
      <Controls />
    </div>
    <div :class="css.textareaContainer">
      <textarea :id="ids.textareaEditor" v-model="editorData.body" :spellcheck="false" @keydown.tab.prevent="insertTab"
        :class="css.textarea" />
    </div>
  </div>
</template>
