<script setup lang="ts">
import Article from '@/components/post/Article.vue'
import { MUTATION_EVENT_SHOW_PREVIEW } from '@/store/mutations';
import { useAppStore } from '@store/index'
import { computed } from 'vue';

const store = useAppStore()

const editorData = computed(() => store.state.article.textEditorData)

function handleBackToEditor() {
  store.commit(MUTATION_EVENT_SHOW_PREVIEW, false)
}
</script>

<template>
  <div class="text-[#F2F2F2]">
    <div class="w-full h-fit relative">
      <button
        @click="handleBackToEditor"
        class="flex mb-6 items-center gap-x-2 active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3 bg-[#f2f2f2]/5"
      >
        <ph-arrow-u-up-left :size="20" class="font-bold" /> Back
      </button>
      <h2
        class="text-3xl font-semibold absolute left-1/2 -translate-x-1/2 top-1 text-[#F2F2F2]/80"
      >
        Preview
      </h2>
    </div>
    <Article v-bind="{...editorData}" :showFooter="false" />
  </div>
</template>
