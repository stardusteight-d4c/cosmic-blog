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
  },
  setup(props) {
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE

    return { props, HTML_ID }
  },
})
</script>

<template>
  <div :id="HTML_ID.post" class="relative shadow-md shadow-black/20">
    <ArticleHeader />
    <ArticleBody :scale-up="props.scaleUp" />
  </div>
</template>
