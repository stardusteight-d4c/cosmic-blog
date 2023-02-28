<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NewPost',
  setup() {
    const iconStyle = {
      size: 42,
      color: '#F2F2F2',
      weight: 'fill',
      class: `p-2 hover:bg-white/20 transition-all duration-300 ease-in-out rounded-lg cursor-pointer`,
    }

    const textContent = ref('')
    const oldValue = ref('')
    const textarea = ref<HTMLTextAreaElement>()

    let saveText = ''

    const handleSelected = (type: string) => {
      const textareaElement = textarea.value
      if (!textareaElement) {
        return
      }
      const selectionStart = textareaElement.selectionStart
      const selectionEnd = textareaElement.selectionEnd
      console.log('textarea.value?.textLength', textarea.value?.textLength)

      console.log(
        'selectionStart',
        selectionStart,
        'selectionEnd',
        selectionEnd
      )

      const selectedText = textareaElement.value.slice(
        selectionStart,
        selectionEnd
      )
      const newValue =
        textareaElement.value.slice(0, selectionStart) +
        getFormattedText(selectedText, type) +
        textareaElement.value.slice(selectionEnd)

      textContent.value = newValue
      oldValue.value = textareaElement.value
    }

    const getFormattedText = (text: string, type: string) => {
      switch (type) {
        case 'bold':
          return `**${text}**`
        case 'italic':
          return `_${text}_`
        case 'underline':
          return `<u>${text}</u>`
        case 'link':
          return `[exemplo](https://exemplo.com/)`
        case 'image':
          return `![descrição](https://exemplo.com/imagem.png)`
        case 'code':
          return `\`\`\`lang\n${text}\n\`\`\``
        case 'align-left':
          return `<div style="text-align: left;">${text}</div>`
        case 'align-center':
          return `<div style="text-align: center;">${text}</div>`
        case 'align-right':
          return `<div style="text-align: right;">${text}</div>`
        case 'save':
          saveText = textContent.value
          localStorage.setItem('saveText', textContent.value)
        default:
          return text
      }
    }

    const insertTab = (event: KeyboardEvent) => {
      event.preventDefault()
      const textareaElement = textarea.value
      if (!textareaElement) {
        return
      }
      const selectionStart = textareaElement.selectionStart
      const selectionEnd = textareaElement.selectionEnd

      const newValue =
        textareaElement.value.slice(0, selectionStart) +
        '\t' +
        textareaElement.value.slice(selectionEnd)

      textContent.value = newValue
      oldValue.value = textareaElement.value

      textareaElement.selectionStart = selectionStart + 1
      textareaElement.selectionEnd = selectionEnd + 1
    }

    const undo = () => {
      return
    }

    const save = () => {
      saveText = textContent.value
          localStorage.setItem('saveText', textContent.value)
    }

    const getSave = () => {
      const savedText = localStorage.getItem('saveText')
      if (!savedText) {
        return
      }
      textContent.value = savedText
    }

    return {
      iconStyle,
      textContent,
      insertTab,
      getSave,
      save,
      undo,
      handleSelected,
      textarea,
    }
  },
})
</script>

<template>
  <div class="bg-[#111111] min-h-screen w-screen">
    <div class="max-w-7xl mx-auto">
      <div
        class="border border-white/10 mx-auto w-full rounded-lg overflow-hidden max-w-[1000px]"
      >
        <div
          class="bg-[#171717] text-[#F2F2F2] flex gap-2 px-4 py-2 rounded-t-lg"
        >
          <ph-text-bolder
            v-on:click="handleSelected('bold')"
            v-bind="iconStyle"
          />
          <ph-text-italic
            v-on:click="handleSelected('italic')"
            v-bind="iconStyle"
          />
          <ph-text-underline
            v-on:click="handleSelected('underline')"
            v-bind="iconStyle"
          />
          <ph-link v-on:click="handleSelected('link')" v-bind="iconStyle" />
          <ph-image v-on:click="handleSelected('image')" v-bind="iconStyle" />
          <ph-code v-on:click="handleSelected('code')" v-bind="iconStyle" />

          <ph-text-align-left v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-text-align-center
            v-on:click="handleSelected"
            v-bind="iconStyle"
          />
          <ph-text-align-right v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-floppy-disk
            v-on:click="handleSelected('save')"
            v-bind="iconStyle"
          />
          <ph-eye v-on:click="handleSelected" v-bind="iconStyle" />
        </div>
        <div
          class="bg-[#171717] text-[#F2F2F2] border-t border-t-white/10 flex gap-2 w-full max-w-[1000px] h-full mx-auto rounded-b-lg"
        >
          <textarea
            ref="textarea"
            :spellcheck="false"
            v-model="textContent"
            @keydown.tab.prevent="insertTab"
            @keydown.ctrl.z="undo"
            @keydown.ctrl.s.prevent="save"
            @keydown.ctrl.a="getSave"
            class="bg-[#171717] min-h-[500px] max-h-[500px] p-4 resize-none outline-none text-[#F2F2F2] w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
