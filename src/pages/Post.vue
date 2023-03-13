<script lang="ts">
import { defineComponent, ref } from 'vue'
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

// mexer no componente rich text

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
    const scaleUp = ref(false)

    function scaleChangeObserver(payload: boolean) {
      scaleUp.value = payload
    }

    return {
      scaleChangeObserver,
      scaleUp,
      HTML_ID,
    }
  },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] w-screen">
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
      <div>
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
