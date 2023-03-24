<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import { SavePopUp } from '@/components/pop-ups'
import { useAppStore } from '@store/index'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'
import * as Icon from '@/components/@globals/atoms/icons'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils/html-ids'
import { controlsStyles as css } from './styles'

onMounted((): void => {
  textarea.value = document.getElementById(
    ids.textareaEditor
  )! as HTMLTextAreaElement
})

const store = useAppStore()
const textContent = ref('')
const textarea = ref<HTMLTextAreaElement>()
const proceedToSave = ref(false)
const editorData = reactive({
  body: textContent,
})

function handleSelected(type: string): void {
  const textareaElement = textarea.value
  if (!textareaElement) {
    return
  }
  handleMarkdown(textareaElement, type)
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
  store.commit(MUTATION_SEED_TEXT_EDITOR_DATA, { ...payload })
  store.commit(MUTATION_EVENT_SHOW_PREVIEW, true)
}

const iconsFirstSection = [
  { Icon: Icon.Bold, name: 'bold' },
  { Icon: Icon.Italic, name: 'italic' },
  { Icon: Icon.Underline, name: 'underline' },
  { Icon: Icon.Link, name: 'link' },
  { Icon: Icon.Image, name: 'image' },
  { Icon: Icon.CodeBlock, name: 'code-block' },
  { Icon: Icon.HeadingTwo, name: 'heading-two' },
  { Icon: Icon.Quotes, name: 'quotes' },
  { Icon: Icon.AlignLeft, name: 'align-left' },
  { Icon: Icon.AlignCenter, name: 'align-center' },
  { Icon: Icon.AlignRight, name: 'align-right' },
]
const iconsSecondSection = [
  { Icon: Icon.Eye, execute: () => handleShowPreview() },
  { Icon: Icon.FloppyDisk, execute: () => (proceedToSave.value = true) },
  { Icon: Icon.Download, execute: () => getSave() },
]
</script>

<template>
  <SavePopUp v-if="proceedToSave" @closedSavePopUp="closedSavePopUpObserver" />
  <div :class="css.flexCenter">
    <div v-for="item in iconsFirstSection">
      <component
        :is="item.Icon"
        v-on:click="handleSelected(item.name)"
        width="42"
        height="42"
        :class="css.iconStyle"
      />
    </div>
  </div>
  <div :class="css.flexCenter">
    <div v-for="item in iconsSecondSection">
      <component
        :is="item.Icon"
        v-on:click="item.execute()"
        width="42"
        height="42"
        :class="css.iconStyle"
      />
    </div>
  </div>
</template>
