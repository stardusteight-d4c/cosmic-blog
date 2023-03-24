<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import { Controls } from '.'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils/html-ids'
import { editorStyles as css } from './styles'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

onMounted((): void => {
  textarea.value = document.getElementById(
    ids.textareaEditor
  )! as HTMLTextAreaElement
})

const textarea = ref<HTMLTextAreaElement>()

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
      <textarea
        :id="ids.textareaEditor"
        :spellcheck="false"
        @keydown.tab.prevent="insertTab"
        :class="css.textarea"
      />
    </div>
  </div>
</template>
