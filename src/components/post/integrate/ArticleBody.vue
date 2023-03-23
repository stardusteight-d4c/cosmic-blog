<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '@globals/atoms/icons'
import * as marked from 'marked'
import { dateFormat } from '@/utils/date-format'
import { placeholder } from '@/utils/placeholder'
import { HTML_ELEMENT_IDS_POST_PAGE } from '@/utils/html-ids'
import { ArticleFooter } from '.'
import { articleBodyStyles as css } from './styles'

defineProps({
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
})

// const htmlBody = ref(marked.marked(placeholder))
const htmlBody = ref()
const HTML_ID = HTML_ELEMENT_IDS_POST_PAGE
</script>

<template>
  <div :id="HTML_ID.articleBody" :class="css.wrapper(showFooter)">
    <div :class="css.articleContentContainer">
      <span :class="css.date">
        <Calendar width="20" heigth="20" color="#F2F2F270" />{{
          dateFormat(date!)
        }}
      </span>
      <h1 :class="css.title">
        {{ title === '' ? 'Untitled' : title }}
      </h1>
      <div :class="css.divider" />
      <div
        :id="HTML_ID.htmlBody"
        v-html="marked.marked(body!)"
        :class="css.articleContent"
      />
    </div>
    <ArticleFooter v-if="showFooter" />
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
