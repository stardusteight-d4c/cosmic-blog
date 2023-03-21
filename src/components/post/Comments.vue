<script setup lang="ts">
import { SubmitComment, Comment, Pagination } from './integrate'
import { HTML_ELEMENT_IDS_POST_PAGE as ids } from '@/utils/html-ids'
</script>

<template>
  <section :id="ids.commentsSection">
    <h2
      class="text-2xl text-[#F2F2F2]/50 border-b border-[#F2F2F2]/20 mb-8 pb-2"
    >
      Comments
    </h2>
    <SubmitComment />
    <Comment />
    <Pagination />
  </section>
</template>

