<script setup lang="ts">
import Article from '@/components/post/Article.vue'
import { MUTATION_EVENT_SHOW_PREVIEW } from '@/store/mutations'
import { useAppStore } from '@store/index'
import { computed } from 'vue'
import { ArrowUUPLeft } from '@globals/atoms/icons'
import { previewPostStyles as css } from './styles'

const store = useAppStore()

const editorData = computed(() => store.state.article.textEditorData)

function handleBackToEditor(): void {
  store.commit(MUTATION_EVENT_SHOW_PREVIEW, false)
}
</script>

<template>
  <div>
    <div :class="css.wrapper">
      <button @click="handleBackToEditor" :class="css.backToEditorBtn">
        <ArrowUUPLeft width="20" height="20" /> Back
      </button>
      <h1 :class="css.title">Preview</h1>
    </div>
    <Article v-bind="{ ...editorData }" :showFooter="false" />
  </div>
</template>
