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

    const handleSelected = (type: string) => {
      const textareaElement = textarea.value
      if (!textareaElement) {
        return
      }
      const selectionStart = textareaElement.selectionStart
      const selectionEnd = textareaElement.selectionEnd
      console.log('textarea.value?.textLength', textarea.value?.textLength);
      
      console.log('selectionStart', selectionStart, 'selectionEnd', selectionEnd);
      
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
          return `<a href="insira o link">${text}</a>`
        case 'image':
          return `<img src="${text}" alt="">`
        case 'code':
          return `\`\`\`${text}\`\`\``
        case 'align-left':
          return `<div style="text-align: left;">${text}</div>`
        case 'align-center':
          return `<div style="text-align: center;">${text}</div>`
        case 'align-right':
          return `<div style="text-align: right;">${text}</div>`
      }
    }

    return {
      iconStyle,
      textContent,
      handleSelected,
      textarea,
    }
  },
})
</script>

<template>
  <div class="bg-[#171717] min-h-screen w-screen">
    <div class="max-w-7xl mx-auto">
      <div
        class="border mx-auto w-full rounded-2xl overflow-hidden max-w-[1000px] h-fit"
      >
        <div
          class="bg-[#111111] text-[#F2F2F2] flex gap-2 px-4 py-2 rounded-t-lg"
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
          <ph-code v-on:click="handleSelected" v-bind="iconStyle" />

          <ph-text-align-left v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-text-align-center
            v-on:click="handleSelected"
            v-bind="iconStyle"
          />
          <ph-text-align-right v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-eye v-on:click="handleSelected" v-bind="iconStyle" />
        </div>
        <div
          class="bg-[#111111] text-[#F2F2F2] border-t border-t-white/10 flex gap-2 w-full max-w-[1000px] mx-auto rounded-b-lg"
        >
          <textarea
            ref="textarea"
            v-model="textContent"
            class="bg-[#111111] p-4 outline-none text-[#F2F2F2] w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
