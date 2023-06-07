<script setup lang="ts">
import { SubmitComment, Comment, Pagination } from './integrate'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils'
import { commentsStyles as css } from './styles'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { postMethods } from '@/store/modules/post'
import { computed, onMounted, ref } from 'vue'

const route = useRoute()
const store = useAppStore()
const id = route.params.id
onMounted(async () => {
  await store.dispatch(postMethods.actions.GET_COMMENTS, {
    postId: id,
    skip: 0,
  })
})
const comments = computed(() => store.state.post.comments)
const currentPage = ref(0)
const loading = ref(true)

async function handleNextPage() {
  console.log('next', currentPage.value)

  if (comments.value.length === 4) {
    loading.value = true
    currentPage.value++
    await store.dispatch(postMethods.actions.GET_COMMENTS, {
      postId: id,
      skip: currentPage.value * 4,
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
    const element = document.getElementById('comments')!
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
    console.log('next', currentPage.value)
  }
}

async function handleBackPage() {
  console.log(comments.value)
  if (currentPage.value > 0) {
    loading.value = true
    currentPage.value--
    await store.dispatch(postMethods.actions.GET_COMMENTS, {
      postId: id,
      skip: currentPage.value * 4,
    })
    setTimeout(() => {
      loading.value = false
    }, 500)
    const element = document.getElementById('comments')!
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }
}
</script>

<template>
  <section :id="ids.commentsSection">
    <h2 :class="css.title">Comments</h2>
    <SubmitComment />
    <div id="comments">
      <Comment
        v-for="comment in comments"
        :ownerId="comment.owner.id"
        :username="comment.owner.username"
        :content="comment.content"
        :postedAt="comment.postedAt"
        :avatarUrl="comment.owner.avatar"
      />
      <Pagination
        :currentPage="currentPage"
        :comments="comments"
        :back="handleBackPage"
        :next="handleNextPage"
      />
    </div>
  </section>
</template>
