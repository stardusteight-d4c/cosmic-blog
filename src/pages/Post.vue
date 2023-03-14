<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/navbar/Navbar.vue'
import {
  Article,
  PostProgressBar,
  PostScale,
  SubmitComment,
  Comment,
  Pagination,
} from '@/components/post'
import { HTML_ELEMENT_IDS_POST_PAGE } from '../utils/html-ids'
import TextAlign from '@/components/post/integrate/TextAlign.vue'
import TextOpacity from '@/components/post/integrate/TextOpacity.vue'

// Body do article recebe 1.3 scale à mais
// 1.3 -> +30% do tamanho original

// -> Body do article 6.444px de height
// com ScaleUp true ele ganha +30% -> 6.444 + 30% = 8377.2px
// Tamanho original menos Tamanho com o ScaleUp = Tamanho de acréscimo (6444 - 8377 = 1.939)
// margin top da sessão de comentários deve ser Tamanho de acréscimo + um padding adicional do post (se não vai ficar grudado)

export default defineComponent({
  name: 'Post',
  components: {
    Navbar,
    Article,
    PostProgressBar,
    PostScale,
    SubmitComment,
    Comment,
    Pagination,
    TextOpacity,
    TextAlign,
  },
  computed: {
    postId(): string {
      return String(this.$route.params.id)
    },
  },
  setup() {
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
    const route = useRoute()
    const id = route.params.id
    const articleBody = ref<HTMLDivElement | null>(null)
    const state = reactive({
      scaleUp: false,
      marginTopOnScaleUp: 0,
    })

    onMounted(() => {
      computedMarginTopOnScaleUp()
    })

    const computedMarginTopOnScaleUp = () => {
      const articleBody = document.getElementById(HTML_ID.articleBody)!
      const marginBottomArticleBody = 112
      const originalHeight = articleBody?.clientHeight
      const heightOnScaleUp = originalHeight * 1.3 // 30%
      const heightIncrease = heightOnScaleUp - originalHeight
      const marginTop = heightIncrease + marginBottomArticleBody
      state.marginTopOnScaleUp = marginTop
    }

    function scaleChangeObserver(payload: boolean) {
      state.scaleUp = payload
    }

    // Debug reasons
    // watch(state, (newValue) => {
    //   console.log('newValue', newValue.marginTopOnScaleUp)
    // })
    

    return {
      scaleChangeObserver,
      articleBody,
      ...toRefs(state),
      HTML_ID,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] h-fit overflow-hidden w-screen">
    <portal-target name="deletePopUp"></portal-target>
    <div
      class="flex flex-col items-end justify-end gap-y-4 w-fit h-fit fixed bottom-4 right-4"
    >
      <TextOpacity />
      <TextAlign />
      <PostScale @scaleChanged="scaleChangeObserver" />
      <PostProgressBar />
    </div>
    <Navbar path="post" />
    <div class="max-w-[725px] w-full mx-auto mb-28">
      <Article :scaleUp="scaleUp" />
      <div v-bind:style="{ marginTop: scaleUp ? `${marginTopOnScaleUp!}px` : '0px' }">
        <h2
          class="text-2xl text-[#F2F2F2]/50 border-b border-[#F2F2F2]/20 mb-8 pb-2"
        >
          Comments
        </h2>
        <SubmitComment />
        <Comment />
        <Pagination />
      </div>
    </div>
  </div>
</template>
