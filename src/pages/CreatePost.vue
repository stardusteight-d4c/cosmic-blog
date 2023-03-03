<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

// Fazer o upload da imagem de capa
// Permitir apenas até 25MB

// Fazer a formatação adequada do markdown/rich text editor

export default defineComponent({
  name: 'CreatePost',
  setup() {
    const iconStyle = {
      size: 42,
      weight: 'fill',
      class: `p-2 text-[#F2F2F2] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
    }
    const tag = ref('')
    const selectedTags = ref<Array<string>>([])
    const isFocused = ref<'title' | 'textarea' | 'tags' | undefined>(undefined)
    const textContent = ref('')
    const oldValue = ref('')
    const coverImage = ref<FileList | null>(null)
    const inputFile = ref()
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

    watch(isFocused, (newValue, oldValue) => {
      console.log(`isFocused changed from ${oldValue} to ${newValue}`)
    })

    watch(coverImage, () => {
      console.log(coverImage.value)
    })

    function onFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      const files = input.files as FileList
      const maxFileSize = 3 * 1024 * 1024; // 3MB em bytes
      const file = files[0];

      if (file && file.size > maxFileSize) {
        alert('O arquivo selecionado é maior do que 3MB');
        input.value = ''; // limpa o valor do input
      } else {
        coverImage.value = files
      }
    }

    const undo = () => {
      return
    }

    const save = () => {
      saveText = textContent.value
      localStorage.setItem('saveText', textContent.value)
    }

    const handleTags = () => {
      if (tag.value.length > 10 || tag.value.length < 3) {
        window.alert('As tags devem conter entre 3 e 10 caracteres')
        return
      }
      if (selectedTags.value.length === 4) {
        window.alert('Você atingiu o limite de tags')
        return
      }
      selectedTags.value.push('#' + tag.value)
      tag.value = ''
    }

    const onClickUpload = () => {
      const clickEvent = new MouseEvent('click', { bubbles: true })
      inputFile.value.dispatchEvent(clickEvent)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Backspace' && tag.value === '') {
        selectedTags.value.pop()
      }
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
      coverImage,
      selectedTags,
      handleTags,
      onKeyDown,
      onFileChange,
      tag,
      inputFile,
      isFocused,
      undo,
      onClickUpload,
      handleSelected,
      textarea,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] max-h-screen w-screen">
    <div class="max-w-7xl px-8 mx-auto">
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
      <div class="flex items-start justify-start">
        <div>
          <div
            class="text-[#F2F2F2] max-w-[800px] w-full bg-[#151618] rounded-sm border border-[#F2F2F2]/20 py-12 px-14"
          >
            <div class="flex items-center gap-x-2">
              <button
                v-on:click="onClickUpload"
                :class="`${
                  coverImage ? 'border-blue-500/50' : ' border-[#F2F2F2]/20'
                } border active:scale-90 transition-all duration-300 font-medium py-2 px-3 rounded-sm bg-white/5`"
              >
                <span v-if="coverImage" class="whitespace-nowrap">Uploaded Image</span>
                <span v-else >Add a cover image</span>
              </button>
              <span v-if="coverImage" class="truncate w-[80%]">{{ coverImage[0].name }}</span>
            </div>
            <input
              type="file"
              class="hidden"
              ref="inputFile"
              accept="image/png, image/jpeg"
              @change="onFileChange"
            />
            <input
              type="text"
              v-on:focus="isFocused = 'title'"
              placeholder="New post title here..."
              class="outline-none placeholder:text-[#F2F2F2]/30 text-4xl h-[75px] mt-4 w-full bg-transparent"
            />
            <div class="flex items-center">
              <span
                v-for="(tag, index) in selectedTags"
                :key="index"
                class="bg-blue-500/80 p-1 font-medium rounded-sm text-sm mr-2"
                >{{ tag }}</span
              >
              <input
                type="text"
                placeholder="Add up to 4 tags..."
                v-on:focus="isFocused = 'tags'"
                @keydown.enter="handleTags"
                v-model="tag"
                @keydown="onKeyDown"
                class="w-full bg-transparent text-base outline-none placeholder:text-[#F2F2F2]/30"
              />
            </div>
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
                    v-bind="iconStyle"
                  />
                  <ph-text-underline
                    v-on:click="handleSelected('underline')"
                    v-bind="iconStyle"
                  />
                  <ph-link
                    v-on:click="handleSelected('link')"
                    v-bind="iconStyle"
                  />
                  <ph-image
                    v-on:click="handleSelected('image')"
                    v-bind="iconStyle"
                  />
                  <ph-code
                    v-on:click="handleSelected('code')"
                    v-bind="iconStyle"
                  />

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
                </div>
                <div>
                  <ph-dots-three-outline v-bind="iconStyle" />
                </div>
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
                  v-on:focus="isFocused = 'textarea'"
                  class="bg-transparent min-h-[125px] h-[25vh] xl:h-[32vh] 2xl:h-[38vh] 3xl:h-[47vh] 4xl:h-[53vh] py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
                />
              </div>
            </div>
          </div>

          <div class="mt-4 pb-8 flex items-center gap-x-4">
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
        <div
          v-if="isFocused === 'title'"
          class="max-w-[350px] text-[#F2F2F2] ml-4"
        >
          <h3 class="font-semibold text-xl text-[#F2F2F2]/80">
            Writing a Great Post Title
          </h3>
          <span
            class="text-[#F2F2F2]/50 text-sm !leading-[20px] mt-2 inline-block"
          >
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence. Use keywords where appropriate to help ensure people can
            find your post by search.
          </span>
        </div>
        <div
          v-if="isFocused === 'textarea'"
          class="max-w-[350px] text-[#F2F2F2] ml-4"
        >
          <h3 class="font-semibold text-xl text-[#F2F2F2]/80">Editor Basics</h3>
          <span
            class="text-[#F2F2F2]/50 text-sm !leading-[20px] mt-2 inline-block"
          >
            Use Markdown to write and format posts. Commonly used syntax Embed
            rich content such as Tweets, YouTube videos, etc. Use the complete
            URL: {% embed https://... %}. See a list of supported embeds. In
            addition to images for the post's content, you can also drag and
            drop a cover image.
          </span>
        </div>
        <div
          v-if="isFocused === 'tags'"
          class="max-w-[350px] text-[#F2F2F2] ml-4"
        >
          <h3 class="font-semibold text-xl text-[#F2F2F2]/80">
            Tagging Guidelines
          </h3>
          <span
            class="text-[#F2F2F2]/50 text-sm !leading-[20px] mt-2 inline-block"
          >
            Tags help people find your post. Think of tags as the topics or
            categories that best describe your post. Add up to four
            comma-separated tags per post. <br />
            <br />
            Combine tags to reach the appropriate subcommunities. <br />
            <br />
            Use existing tags whenever possible. Some tags, such as “help” or
            “healthydebate”, have special posting guidelines.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
