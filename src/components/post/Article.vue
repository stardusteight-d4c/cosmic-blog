<script lang="ts">
import { defineComponent } from 'vue'
import { HTML_ELEMENT_IDS_POST_PAGE } from '../../utils/html-ids'
import ArticleHeader from './integrate/ArticleHeader.vue'
import ArticleBody from './integrate/ArticleBody.vue'

export default defineComponent({
  name: 'Article',
  components: { ArticleHeader, ArticleBody },
  props: {
    scaleUp: {
      type: Boolean,
      required: true,
    },
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
  },
  setup(props) {
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
    const headerProps = { coverImage: props.coverImage, tags: props.tags }
    const bodyProps = {
      showFooter: props.showFooter,
      scaleUp: props.scaleUp,
      title: props.title,
      date: props.date,
      body: props.body,
    }

    console.log('props.scaleUp', props.scaleUp);
    

    return { bodyProps, headerProps, HTML_ID }
  },
})
</script>

<template>
  <div
    :id="HTML_ID.post"
    class="relative shadow-md shadow-black/20"
  >
    <ArticleHeader v-bind="headerProps" />
    <ArticleBody v-bind="bodyProps" />
  </div>
</template>
