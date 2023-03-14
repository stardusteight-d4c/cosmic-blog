<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  Chat as ChatIcon,
  Star as StarIcon,
  Calendar as CalendarIcon,
} from '@/atoms/icons'
import * as marked from 'marked'
import { dateFormat } from '@/utils/date-format'
import { placeholder } from '@/utils/placeholder'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'

export default defineComponent({
  name: 'ArticleBody',
  components: { StarIcon, ChatIcon, CalendarIcon },
  props: {
    showFooter: {
      type: Boolean,
      default: true,
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
  setup(props, { emit }) {
    const htmlBody = ref(marked.marked(placeholder))
    const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE

    return { props, htmlBody, dateFormat, HTML_ID }
  },
})
</script>

<template>
  <div
    :id="HTML_ID.articleBody"
    :class="{
      'pb-8': !props.showFooter,
      'bg-[#252525] relative rounded-b-sm overflow-hidden mb-28 pt-4 z-50 shadow-sm shadow-black/20 duration-500 cursor-default transition-all': true,
    }"
  >
    <div class="px-4">
      <span
        class="my-2 font-medium text-base text-[#F2F2F2]/60 flex items-center justify-center gap-x-1"
      >
        <CalendarIcon size="20" color="#F2F2F270" />{{
          dateFormat(props.date!)
        }}
      </span>

      <h1
        class="text-4xl bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text text-transparent font-bold text-center"
      >
        {{ props.title }}
      </h1>
      <div class="border-b border-[#F2F2F2]/20 w-[50%] mx-auto my-8 h-0" />

      <div
        v-html="htmlBody"
        class="articleBody text-[#F2F2F2]/80 break-words text-justify text-lg font-medium"
      />
    </div>
    <div
      v-if="props.showFooter"
      class="border-t border-[#F2F2F2]/20 py-4 mt-8 text-[#F2F2F2]/50"
    >
      <span class="flex items-center justify-center gap-x-1">
        <StarIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Starred • 38
      </span>
      <span class="flex items-center justify-center gap-x-1">
        <ChatIcon color="#F2F2F250" class="w-4 -mt-[1px]" /> Comments • 2
      </span>
    </div>
  </div>
</template>

<style>
/* GLOBAL */
.articleBody {
  color: #f2f2f298;
  overflow: hidden;
}

/* HEADINGS */
.articleBody h2 {
  font-size: 1.875rem /* 30px */ !important;
  line-height: 2.25rem /* 36px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h3 {
  font-size: 1.5rem /* 24px */ !important;
  line-height: 2rem /* 32px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h4 {
  font-size: 1.25rem /* 20px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h5 {
  font-size: 1.125rem /* 18px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}
.articleBody h6 {
  font-size: 1rem /* 16px */ !important;
  line-height: 1.5rem /* 24px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
}

/* CODE BLOCK */
.articleBody pre {
  max-width: 100%;
  background-color: rgb(0 0 0 / 0.5);
  margin-block: 19px;
  border-radius: 0.125rem /* 2px */;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  text-align: left !important;
  overflow-x: scroll;
  -webkit-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  -moz-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  padding: 1em !important;
  box-sizing: content-box;
}
.articleBody code {
  width: 90%;
  color: #f2f2f2;
  font-weight: 300;
  text-align: left !important;
  box-sizing: content-box;
  margin-left: 14px;
}

/* TABLE */
.articleBody table {
  width: fit-content;
  margin-inline: auto;
}
.articleBody th {
  text-align: center;
  padding: 8px;
  border: 1px solid #f2f2f250;
}
.articleBody td {
  text-align: center;
  padding: 8px;
  border: 1px solid #f2f2f250;
  margin-inline: auto;
}

/* IMAGE */
.articleBody img {
  border-radius: 2px;
  object-fit: cover;
}
</style>
