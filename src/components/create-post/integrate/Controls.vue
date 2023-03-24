<script setup lang="ts">
import { ref, reactive, onMounted} from 'vue'
import { handleMarkdown } from '@/utils/handle-markdown'
import { SavePopUp } from '@/components/pop-ups'
import { useAppStore } from '@store/index'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'
import * as Icon from '@/components/@globals/atoms/icons'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils/html-ids'

onMounted((): void => {
  textarea.value = document.getElementById(
    ids.textareaEditor
  )! as HTMLTextAreaElement
})

const store = useAppStore()
const iconStyle = `p-2 text-[#F2F2F2] fill-[#F2F2F2] text-[35px] md:text-[42px] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`
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
</script>

<template>
  <div class="flex items-center">
    <Icon.Bold
      width="42"
      height="42"
      v-on:click="handleSelected('bold')"
      :class="iconStyle"
    />
    <Icon.Italic
      width="42"
      height="42"
      v-on:click="handleSelected('italic')"
      :class="iconStyle"
    />
    <Icon.Underline
      width="42"
      height="42"
      v-on:click="handleSelected('underline')"
      :class="iconStyle"
    />
    <Icon.Link
      width="42"
      height="42"
      v-on:click="handleSelected('link')"
      :class="iconStyle"
    />
    <Icon.Image
      width="42"
      height="42"
      v-on:click="handleSelected('image')"
      :class="iconStyle"
    />
    <Icon.CodeBlock
      width="42"
      height="42"
      v-on:click="handleSelected('code-block')"
      :class="iconStyle"
    />
    <Icon.HeadingTwo
      width="42"
      height="42"
      v-on:click="handleSelected('heading-two')"
      :class="iconStyle"
    />
    <Icon.Quotes
      width="42"
      height="42"
      v-on:click="handleSelected('quotes')"
      :class="iconStyle"
    />
    <Icon.AlignLeft
      width="42"
      height="42"
      v-on:click="handleSelected('align-left')"
      :class="iconStyle"
    />
    <Icon.AlignCenter
      width="42"
      height="42"
      v-on:click="handleSelected('align-center')"
      :class="iconStyle"
    />
    <Icon.AlignRight
      width="42"
      height="42"
      v-on:click="handleSelected('align-right')"
      :class="iconStyle"
    />
  </div>
  <div class="flex items-center">
    <Icon.Eye width="42" height="42" @click="handleShowPreview" :class="iconStyle" />
    <Icon.FloppyDisk
      width="42"
      height="42"
      v-on:click="proceedToSave = true"
      :class="iconStyle"
    />
    <SavePopUp
      v-if="proceedToSave"
      @closedSavePopUp="closedSavePopUpObserver"
    />
    <Icon.Download width="42" height="42" v-on:click="getSave" :class="iconStyle" />
  </div>
</template>
