<script setup lang="ts">
import { ref, reactive, toRef } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'
import { ArticleHeader, ArticleBody } from './integrate'
import { articleStyles as css } from './styles'

const props = defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<string>,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
const headerProps = ref({ coverImage: props.coverImage, tags: props.tags })
const bodyProps = reactive({
  showFooter: toRef(props, 'showFooter'),
  title: toRef(props, 'title'),
  date: toRef(props, 'date'),
  body: toRef(props, 'body'),
})
</script>

<template>
  <div :id="HTML_ID.post" :class="css.wrapper">
    <ArticleHeader v-bind="headerProps" />
    <ArticleBody v-bind="bodyProps" />
  </div>
</template>
