<script lang="ts">
import { defineComponent, ref, reactive, toRef } from 'vue'
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
    const articleBody = ref(null)
    const headerProps = ref({ coverImage: props.coverImage, tags: props.tags })
    const bodyProps = reactive({
      showFooter: toRef(props, 'showFooter'),
      scaleUp: toRef(props, 'scaleUp'),
      title: toRef(props, 'title'),
      date: toRef(props, 'date'),
      body: toRef(props, 'body'),
    })

    console.log('bodyProps.scaleUp -> Article', bodyProps.scaleUp)

    return { bodyProps, headerProps, HTML_ID, articleBody }
  },
})
</script>

<template>
  <div :id="HTML_ID.post" class="relative shadow-md shadow-black/20">
    <ArticleHeader v-bind="headerProps" />
    <ArticleBody ref="articleBody" v-bind="bodyProps" />
  </div>
</template>
