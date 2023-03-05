<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { handleMarkdown } from '../utils/handleMarkdown'
// Fazer o upload da imagem de capa
// Permitir apenas até 25MB

// Fazer a formatação adequada do markdown/rich text editor

export default defineComponent({
  name: 'CreatePost',
  setup() {
    const iconStyle = {
      weight: 'fill',
      class: `p-2 text-[#F2F2F2] text-[35px] md:text-[42px] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
    }
    const tag = ref('')
    const selectedTags: any[] = []
    const isFocused = ref<'title' | 'textarea' | 'tags' | undefined>(undefined)
    const textContent = ref('')
    const oldValue = ref('')
    const coverImage = ref<FileList | null>(null)
    const inputFile = ref()
    const activeItem = ref<'edit' | 'preview'>('edit')
    const textarea = ref<HTMLTextAreaElement>()

    const handleSelected = (type: string) => {
      const textareaElement = textarea.value
      if (!textareaElement) {
        return
      }
      handleMarkdown(textareaElement, type)
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
      const maxFileSize = 3 * 1024 * 1024 // 3MB em bytes
      const file = files[0]

      if (file && file.size > maxFileSize) {
        alert('O arquivo selecionado é maior do que 3MB')
        input.value = '' // limpa o valor do input
      } else {
        coverImage.value = files
      }
    }

    const undo = () => {
      return
    }

    const save = () => {
      const saveText = textarea.value?.value ?? ''
      localStorage.setItem('saveText', saveText)
    }

    const handleTags = () => {
      if (tag.value.length > 10 || tag.value.length < 3) {
        window.alert('As tags devem conter entre 3 e 10 caracteres')
        return
      }
      if (selectedTags.length === 4) {
        window.alert('Você atingiu o limite de tags')
        return
      }
      selectedTags.push('#' + tag.value)
      tag.value = ''
    }

    const onClickUpload = () => {
      const clickEvent = new MouseEvent('click', { bubbles: true })
      inputFile.value.dispatchEvent(clickEvent)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Backspace' && tag.value === '') {
        selectedTags.pop()
      }
    }
    const getSave = () => {
      const savedText = localStorage.getItem('saveText')
      if (!savedText) {
        return
      }
      textarea.value!.value = savedText
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
      activeItem,
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
    <div class="max-w-7xl lg:px-8 mx-auto">
      <header class="py-1 px-2 lg:py-4 lg:px-0 lg:max-w-[800px]">
        <nav>
          <div
            class="flex flex-col mt-2 md:mt-0 md:flex-row items-center gap-x-1"
          >
            <div
              class="flex cursor-pointer text-transparent bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text items-center gap-x-1"
            >
              <router-link to="/" class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="#3b82f6"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <path
                    d="M59.3,40H196.7a8,8,0,0,1,5.6,13.7L128,128,53.7,53.7A8,8,0,0,1,59.3,40Z"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                  <path
                    d="M59.3,216H196.7a8,8,0,0,0,5.6-13.7L128,128,53.7,202.3A8,8,0,0,0,59.3,216Z"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></path>
                  <line
                    x1="72"
                    y1="72"
                    x2="184"
                    y2="72"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="16"
                  ></line>
                </svg>
                <span
                  class="uppercase tracking-widest font-bold text-lg lg:text-3xl"
                  >Cosmic</span
                >
              </router-link>
              <h2
                class="text-[#F2F2F2] whitespace-nowrap cursor-default font-medium text-lg"
              >
                / Create Post
              </h2>
            </div>
            <div
              class="md:ml-auto flex flex-row items-center w-full md:w-fit mt-4 md:mt-0"
            >
              <button
                @click="activeItem = 'edit'"
                :class="`${
                  activeItem === 'edit' && 'bg-[#F2F2F2]/10'
                } p-2 text-[#F2F2F2] w-full md:w-fit font-bold transition-all duration-150 rounded-sm cursor-pointer`"
              >
                Edit
              </button>
              <button
                @click="activeItem = 'preview'"
                :class="`${
                  activeItem === 'preview' && 'bg-[#F2F2F2]/10'
                } p-2 text-[#F2F2F2]  w-full md:w-fit font-bold transition-all duration-150 rounded-sm cursor-pointer`"
              >
                Preview
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div class="flex items-start justify-start">
        <div class="lg:max-w-[800px] w-full">
          <div
            class="text-[#F2F2F2] bg-[#151618] w-full rounded-sm border-y md:border border-[#F2F2F2]/20 px-2 py-4 md:py-12 lg:px-14"
          >
            <div class="flex items-center gap-x-2">
              <button
                v-on:click="onClickUpload"
                :class="`${
                  coverImage ? 'border-blue-500/50' : ' border-[#F2F2F2]/20'
                } border active:scale-90 text-sm md:text-base transition-all duration-300 font-medium py-2 px-3 rounded-sm bg-white/5`"
              >
                <span v-if="coverImage" class="whitespace-nowrap"
                  >Uploaded Image</span
                >
                <span v-else>Add a cover image</span>
              </button>
              <span
                v-if="coverImage"
                class="truncate text-[#F2F2F2]/50 w-[80%]"
                >{{ coverImage[0].name }}</span
              >
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
              class="outline-none placeholder:text-[#F2F2F2]/30 text-2xl md:text-4xl h-[75px] mt-4 w-full bg-transparent"
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
                    :weight="iconStyle.weight"
                    :class="iconStyle.class + ' hidden md:block'"
                  />
                  <ph-text-underline
                    v-on:click="handleSelected('underline')"
                    :weight="iconStyle.weight"
                    :class="iconStyle.class + ' hidden md:block'"
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
                    v-on:click="handleSelected('code-block')"
                    v-bind="iconStyle"
                  />
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
                <div>
                  <ph-floppy-disk v-on:click="save" v-bind="iconStyle" />
                </div>
              </div>
              <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
                <textarea
                  ref="textarea"
                  :spellcheck="false"
                  contenteditable="true"
                  v-bind="textContent"
                  @keydown.tab.prevent="insertTab"
                  @keydown.ctrl.s.prevent="save"
                  @keydown.ctrl.a="getSave"
                  v-on:focus="isFocused = 'textarea'"
                  class="bg-transparent min-h-[125px] h-[25vh] xl:h-[32vh] 2xl:h-[38vh] 3xl:h-[47vh] 4xl:h-[53vh] py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
                />
              </div>
            </div>
          </div>

          <div
            class="my-4 mr-2 ml-auto lg:ml-0 w-fit lg:mr-0 flex items-center gap-x-4"
          >
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
        <div class="hidden lg:block">
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
            <h3 class="font-semibold text-xl text-[#F2F2F2]/80">
              Editor Basics
            </h3>
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
  </div>
</template>
