<script lang="ts">
import { defineComponent, ref, reactive, toRef } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '../../utils/html-ids'
import ArticleHeader from './integrate/ArticleHeader.vue'
import ArticleBody from './integrate/ArticleBody.vue'

export default defineComponent({
  name: 'Article',
  components: { ArticleHeader, ArticleBody },
  props: {
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
  },
  setup(props) {
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
    const headerProps = ref({ coverImage: props.coverImage, tags: props.tags })
    const bodyProps = reactive({
      showFooter: toRef(props, 'showFooter'),
      title: toRef(props, 'title'),
      date: toRef(props, 'date'),
      body: toRef(props, 'body'),
    })

    return { bodyProps, headerProps, HTML_ID }
  },
})
</script>

<template>
  <div :id="HTML_ID.post" class="relative shadow-md shadow-black/20">
    <ArticleHeader v-bind="headerProps" />
    <ArticleBody v-bind="bodyProps" />
  </div>
</template>
