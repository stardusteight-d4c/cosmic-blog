<script setup lang="ts">
import { computed, reactive, toRef } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils'
import { ArticleHeader, ArticleBody } from './integrate'
import { articleStyles as css } from './styles'
import { useAppStore } from '@/store'

interface IProps {
  showFooter?: boolean
  coverImage?: string
  tags?: string[]
  date?: Date
  title?: string
  body?: string
}

const props = defineProps<IProps>()

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
