<script setup lang="ts">
import { SubmitComment, Comment, Pagination } from './integrate'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils'
import { commentsStyles as css } from './styles'
</script>

<template>
  <section :id="ids.commentsSection">
    <h2 :class="css.title">Comments</h2>
    <SubmitComment />
    <Comment />
    <Pagination />
  </section>
</template>
