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
      'bg-[#252525] relative rounded-b-sm overflow-hidden mb-28 pt-4 z-50 shadow-sm shadow-black/20 duration-300 cursor-default transition-all': true,
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
        {{ props.title === '' ? 'Untitled' : props.title }}
      </h1>
      <div class="border-b border-[#F2F2F2]/20 w-[50%] mx-auto my-8 h-0" />

      <div
        :id="HTML_ID.htmlBody"
        v-html="htmlBody"
        class="articleBody text-[#F2F2F280] break-words text-lg font-medium"
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
  font-weight: 700;
}
.articleBody h3 {
  font-size: 1.5rem /* 24px */ !important;
  line-height: 2rem /* 32px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
  font-weight: 700;
}
.articleBody h4 {
  font-size: 1.25rem /* 20px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
  font-weight: 700;
}
.articleBody h5 {
  font-size: 1.125rem /* 18px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
  font-weight: 700;
}
.articleBody h6 {
  font-size: 1rem /* 16px */ !important;
  line-height: 1.5rem /* 24px */ !important;
  color: #f2f2f2 !important;
  margin-bottom: 12px;
  font-weight: 700;
}

/* CODE BLOCK */
.articleBody pre {
  max-width: 100%;
  background-color: #181818;
  margin-block: 8px;
  border-radius: 0.125rem /* 2px */;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  text-align: left !important;
  overflow-x: scroll;
  border-radius: 2px;
  background: #181818;
  box-shadow: inset 7px 7px 14px #111111, inset -7px -7px 14px #1f1f1f;
  padding: 1em !important;
  box-sizing: content-box;
}
.articleBody code {
  width: 90%;
  color: #f2f2f2;
  font-weight: 300;
  background-color: transparent;
  text-align: left !important;
  box-sizing: content-box;
  border-radius: 0.125rem /* 2px */;
  cursor: text;
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
  width: 100%;
  object-fit: cover;
}

/* BLOCKQUOTE */
.articleBody blockquote {
  border-left: 2px solid #f2f2f298;
  padding-left: 8px;
  background-color: #18181890;
}

/* STRONG */
.articleBody strong {
  font-weight: 700;
}
</style>
