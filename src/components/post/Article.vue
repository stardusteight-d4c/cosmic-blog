<script setup lang="ts">
import {  reactive, toRef } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
import { ArticleHeader, ArticleBody } from './integrate'
import { articleStyles as css } from './styles'

const props = defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
  coverImage: {
    type: String,
  },
  tags: {
    type: Array<string>,
  },
  date: {
    type: Date,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
})

const headerProps = reactive({
  coverImage: toRef(props, 'coverImage'),
  tags: toRef(props, 'tags'),
})
const bodyProps = reactive({
  showFooter: toRef(props, 'showFooter'),
  title: toRef(props, 'title'),
  date: toRef(props, 'date'),
  body: toRef(props, 'body'),
})
</script>

<template>
  <div :id="ids.post" :class="css.wrapper">
    <ArticleHeader v-bind="headerProps" />
    <ArticleBody v-bind="bodyProps" />
  </div>
</template>
