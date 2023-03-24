<script setup lang="ts">
import { ref, reactive } from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import { SavePopUp } from '@/components/pop-ups'
import { useAppStore } from '@store/index'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'
import { IArticleData } from '@interfaces/index'

const store = useAppStore()

// Gerar url da coverImg no serviço de storage do supabase, mas isto apenas quando enviar ao servidor,
// para a preview gere uma string base64 e envie-à como props

const iconStyle = {
  weight: 'fill',
  class: `p-2 text-[#F2F2F2] text-[35px] md:text-[42refpx] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
}
const tag = ref('')
const selectedTags = ref<Array<string>>([])
const textContent = ref('')
const coverImage = ref<FileList | null>(null)
const inputFile = ref()
const title = ref('')
const date = new Date()
const textarea = ref<HTMLTextAreaElement>()
const proceedToSave = ref(false)

const editorData = reactive({
  body: textContent,
})



// Debugging reasons
// watch(editorData, (newVal, oldVal) => {
//   console.log('Preview props changed:', { ...newVal })
// })

function handleSelected(type: string): void {
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, type)
}

function insertTab(event: KeyboardEvent): void {
  event.preventDefault()
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, 'tab')
}

function closedSavePopUpObserver(): void {
  proceedToSave.value = false
}

function getSave(): void {
  const savedText = localStorage.getItem('saveText')
  if (!savedText) {
    return
  }
  textarea.value!.value = savedText
}

function handleShowPreview(): void {
  const payload = {
    body: editorData.body,
  }
  store.commit(MUTATION_SEED_TEXT_EDITOR_DATA, {...payload})
  store.commit(MUTATION_EVENT_SHOW_PREVIEW, true)
}
</script>

<template>
  <div class="w-full h-full rounded-lg mt-4">
    <div
      class="flex items-center bg-[#F2F2F2]/5 justify-between gap-2 p-2 rounded-sm"
    >
      <div class="flex items-center">
        <ph-text-bolder
          v-on:click="handleSelected('bold')"
          v-bind="iconStyle"
        />
        <ph-text-italic
          v-on:click="handleSelected('italic')"
          :weight="iconStyle.weight"
          :class="iconStyle.class + ' hidden md:block'"
        />
        <ph-text-underline
          v-on:click="handleSelected('underline')"
          :weight="iconStyle.weight"
          :class="iconStyle.class + ' hidden md:block'"
        />
        <ph-link v-on:click="handleSelected('link')" v-bind="iconStyle" />
        <ph-image v-on:click="handleSelected('image')" v-bind="iconStyle" />
        <ph-code v-on:click="handleSelected('code-block')" v-bind="iconStyle" />
        <ph-text-h-two
          v-on:click="handleSelected('heading-two')"
          v-bind="iconStyle"
        />
        <ph-quotes
          v-on:click="handleSelected('quotes')"
          :weight="iconStyle.weight"
          :class="iconStyle.class + ' hidden md:block'"
        />
        <ph-text-align-left
          v-on:click="handleSelected('align-left')"
          v-bind="iconStyle"
        />
        <ph-text-align-center
          v-on:click="handleSelected('align-center')"
          v-bind="iconStyle"
        />
        <ph-text-align-right
          v-on:click="handleSelected('align-right')"
          v-bind="iconStyle"
        />
      </div>
      <div class="flex items-center">
        <ph-eye @click="handleShowPreview" v-bind="iconStyle" />
        <ph-floppy-disk v-on:click="proceedToSave = true" v-bind="iconStyle" />
        <SavePopUp
          v-if="proceedToSave"
          @closedSavePopUp="closedSavePopUpObserver"
        />

        <ph-download-simple v-on:click="getSave" v-bind="iconStyle" />
      </div>
    </div>
    <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
      <textarea
        ref="textarea"
        id="textarea"
        :spellcheck="false"
        v-model="textContent"
        @keydown.tab.prevent="insertTab"
        class="min-h-[230px] bg-[#1a1a1a] shadow-inner shadow-black/50 p-4 h-full py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
      />
    </div>
  </div>
</template>

<style scoped></style>
