<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import { handleMarkdown } from '../utils/handle-markdown'
import Navbar from '@/components/navbar/Navbar.vue'
import Article from '@/components/post/Article.vue'

// Gerar url da coverImg no serviço de storage do supabase
// Fazer toda preview do post recebendo os dados do rich text editor
// refatorar...


export default defineComponent({
  name: 'CreatePost',
  components: { Navbar, Article },
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
    const showPreview = ref(false)
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

    watch(tag, () => {
      console.log(selectedTags)
    })

    const textareaHeight = ref('')
    const proceedToDelete = ref(false)

    const adjustTextarea = () => {
      nextTick(() => {
        const textarea = document.getElementById('textarea')!
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
        textareaHeight.value = `${textarea.scrollHeight}px`
      })
    }

    function onFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      const files = input.files as FileList
      const maxFileSize = 3 * 1024 * 1024 // 3MB em bytes
      const file = files[0]

      if (file && file.size > maxFileSize) {
        alert('O arquivo selecionado é maior do que 3MB')
        input.value = '' // limpa o valor do input
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        coverImage.value = files

        reader.onload = () => {
          const base64String = reader.result
          console.log(base64String)
        }
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
      showPreview,
      handleTags,
      textareaHeight,
      adjustTextarea,
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
  <div class="bg-[#1a1a1a] min-h-screen w-screen">
    <div class="max-w-[725px] h-full w-full mx-auto mb-8">
      <Navbar path="new" />
      <div v-if="showPreview" class="text-[#F2F2F2]">
        <button
          @click="showPreview = false"
          class="flex mb-5 items-center gap-x-2 active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3 bg-[#f2f2f2]/5"
        >
          <ph-arrow-u-up-left :size="20" class="font-bold" /> Back
        </button>
        <Article :showFooter="false" :scale-up="false" :tags="selectedTags" />
      </div>
      <div
        v-if="!showPreview"
        class="text-[#F2F2F2] bg-[#252525] h-auto w-full overflow-hidden rounded-sm p-4"
      >
        <div class="flex items-center gap-x-2">
          <div class="outer">
            <button
              v-on:click="onClickUpload"
              :class="`${
                coverImage
                  ? 'bg-gradient-to-t from-blue-500 to-violet-500'
                  : 'bg-[#f2f2f2]/5'
              }  active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3`"
            >
              <span
                v-if="coverImage"
                class="whitespace-nowrap flex items-center gap-x-2"
                >Uploaded Image</span
              >
              <span v-else>Add a cover image</span>
            </button>
          </div>
          <span
            v-if="coverImage"
            class="truncate text-[#F2F2F2]/50 w-full max-w-[500px]"
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
          class="bg-[#1a1a1a] shadow-inner shadow-black/50 p-2 outline-none placeholder:text-[#F2F2F2]/30 text-2xl mt-4 w-full"
        />
        <div class="flex items-center mt-4">
          <span
            v-for="(tag, index) in selectedTags"
            :key="index"
            class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
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
              <ph-link v-on:click="handleSelected('link')" v-bind="iconStyle" />
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
            <div class="flex items-center">
              <ph-eye v-on:click="showPreview = true" v-bind="iconStyle" />
              <ph-floppy-disk v-on:click="save" v-bind="iconStyle" />
            </div>
          </div>
          <div class="flex gap-2 w-full h-auto mx-auto rounded-b-lg">
            <textarea
              ref="textarea"
              id="textarea"
              :spellcheck="false"
              contenteditable="true"
              v-bind="textContent"
              @keydown.tab.prevent="insertTab"
              @keydown.ctrl.s.prevent="save"
              @keydown.ctrl.a="getSave"
              @input="adjustTextarea"
              v-on:focus="isFocused = 'textarea'"
              class="scrollHiddenCSO scrollHideenIEF min-h-[230px] bg-[#1a1a1a] shadow-inner shadow-black/50 p-4 h-full py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full"
            />
          </div>
        </div>
        <button class="button">Submit</button>
      </div>
    </div>
    <!-- Fazer isto aqui em forma de um toast, notificator -->
    <!-- <div class="hidden lg:block">
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
          addition to images for the post's content, you can also drag and drop
          a cover image.
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
    </div> -->
  </div>
</template>

<style scoped>
.scrollHiddenCSO::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.scrollHideenIEF {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  margin-left: auto;
  margin-top: 4px;
  border-radius: 999px;
  transition: all 0.5s ease;
}

.button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

.button:hover {
  transform: scale(1.1);
}

.button svg {
  width: 16px;
}
</style>
