<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'NewPost',
  setup() {
    const text = ref()
    const textWrapper = ref([])
    const iconStyle = {
      size: 42,
      color: '#F2F2F2',
      weight: 'fill',
      class: `p-2 hover:bg-white/20 transition-all duration-300 ease-in-out rounded-lg cursor-pointer`,
    }

    watchEffect(() => {
      console.log(text.value)
    })

    const handleSelected = (selected: string) => {
      if (selected === 'bold') {
        const applyBold = '<strong>' + text.value + '</strong>'
      }
      // { bold: 'Fala pessoal!', default: 'Tudo bem com vocês?' }
      // ['<strong>Fala pessoal!</strong>', 'Tudo bem com vocês?']
    }

    return {
      iconStyle,
      handleSelected,
      text,
      textWrapper,
    }
  },
})
</script>

<template>
  <div class="bg-[#171717] min-h-screen w-screen">
    <div class="max-w-7xl mx-auto">
      <div class="border mx-auto w-full rounded-2xl overflow-hidden max-w-[1000px] h-fit">
        <div
          class="bg-[#111111] text-[#F2F2F2] flex gap-2 px-4 py-2 rounded-t-lg"
        >
          <ph-text-bolder
            v-on:click="handleSelected('bold')"
            v-bind="iconStyle"
          />
          <ph-text-italic v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-text-underline v-bind="iconStyle" />
          <ph-link v-on:click="handleSelected" v-bind="iconStyle" />
          <ph-image v-on:click="handleSelected" v-bind="iconStyle" />
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
            v-model="text"
            class="bg-[#111111] p-4 outline-none text-[#F2F2F2] w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
