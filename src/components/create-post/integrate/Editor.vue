<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import { Controls } from '.'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils/html-ids'

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

onMounted((): void => {
  textarea.value = document.getElementById(
    ids.textareaEditor
  )! as HTMLTextAreaElement
})

const textContent = ref('')
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
  <div class="w-full h-full rounded-lg mt-4">
    <div
      class="flex items-center bg-[#F2F2F2]/5 justify-between gap-2 p-2 rounded-sm"
    >
      <Controls />
    </div>
    <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
      <textarea
        ref="textarea"
        :id="ids.textareaEditor"
        :spellcheck="false"
        v-model="textContent"
        @keydown.tab.prevent="insertTab"
        class="min-h-[230px] bg-[#1a1a1a] shadow-inner shadow-black/50 p-4 h-full py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
      />
    </div>
  </div>
</template>
