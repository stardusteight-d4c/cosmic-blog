<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CreatePost',
  setup() {
    const iconStyle = {
      size: 42,
      weight: 'fill',
      class: `p-2 text-[#F2F2F2] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
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
  <div class="bg-[#1a1a1a] min-h-screen w-screen">
    <div class="max-w-7xl mx-auto">
      <header class="py-4">
        <nav class="max-w-[800px]">
          <div class="flex items-center gap-x-1">
            <div
              class="flex cursor-pointer text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text items-center gap-x-1"
            >
              <ph-hourglass-simple-high :size="32" class="text-blue-500" />

              <span class="uppercase tracking-widest font-bold text-3xl"
                >Cosmic</span
              >
            </div>
            <h2 class="text-[#F2F2F2] cursor-default font-medium text-lg">
              / Create Post
            </h2>
            <div class="ml-auto">
              <button v-bind="iconStyle">Edit</button>
              <button v-bind="iconStyle">Preview</button>
            </div>
          </div>
        </nav>
      </header>
      <div
        class="text-[#F2F2F2] max-w-[800px] w-full bg-[#151618] rounded-sm border border-[#F2F2F2]/20 py-12 px-14"
      >
        <button
          class="border border-[#F2F2F2]/20 active:scale-90 font-medium py-2 px-3 rounded-sm bg-white/5"
        >
          Add a cover image
        </button>
        <input type="file" class="hidden" />
        <input
          type="text"
          placeholder="New post title here..."
          class="outline-none placeholder:text-[#F2F2F2]/30 text-4xl h-[75px] mt-4 w-full bg-transparent"
        />
        <div class="w-full h-full rounded-lg mt-4">
          <div class="flex gap-2 py-2 rounded-t-lg -ml-3">
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

            <ph-text-align-left
              v-on:click="handleSelected"
              v-bind="iconStyle"
            />
            <ph-text-align-center
              v-on:click="handleSelected"
              v-bind="iconStyle"
            />
            <ph-text-align-right
              v-on:click="handleSelected"
              v-bind="iconStyle"
            />
            <ph-floppy-disk
              v-on:click="handleSelected('save')"
              v-bind="iconStyle"
            />
            <ph-eye v-on:click="handleSelected" v-bind="iconStyle" />
          </div>
          <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
            <textarea
              ref="textarea"
              :spellcheck="false"
              v-model="textContent"
              @keydown.tab.prevent="insertTab"
              @keydown.ctrl.z="undo"
              @keydown.ctrl.s.prevent="save"
              @keydown.ctrl.a="getSave"
              class="bg-transparent  py-4 outline-none w-full"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 pb-16 flex items-center gap-x-4">
        <button
          class="p-2 px-3 text-[#F2F2F2] font-semibold bg-gradient-to-tr from-blue-500 to-violet-500 active:scale-90 transition-all duration-300 ease-in-out rounded-sm cursor-pointer"
        >
          Submit
        </button>
        <button
          class="p-2 px-3 text-[#F2F2F2] font-semibold bg-gradient-to-tr from-blue-500 to-violet-500 active:scale-90 transition-all duration-300 ease-in-out rounded-sm cursor-pointer"
        >
          Save draft
        </button>
      </div>
    </div>
  </div>
</template>
