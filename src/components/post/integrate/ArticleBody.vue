<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  Chat as ChatIcon,
  Star as StarIcon,
  Calendar as CalendarIcon,
} from '@/atoms/icons'
import * as marked from 'marked'
import { dateFormat } from '@/utils/date-format'

export default defineComponent({
  name: 'ArticleBody',
  components: { StarIcon, ChatIcon, CalendarIcon },
  props: {
    scaleUp: {
      type: Boolean,
      required: true,
    },
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
    const htmlBody = ref(marked.marked(props.body!))

    onMounted(() => {
      const articleBody = document.getElementById(
        'articleBody'
      )! as HTMLDivElement
      articleBody.innerHTML = htmlBody.value
    })

    return { props, htmlBody, dateFormat }
  },
})
</script>

<template>
  <div
    :class="{
      'pb-8': !props.showFooter,
      'scale-[1.30]': props.scaleUp,
      'bg-[#252525] rounded-b-sm overflow-hidden mb-28 pt-4 z-50 relative shadow-sm shadow-black/20 duration-500 cursor-default transition-all': true,
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
        id="articleBody"
        class="articleBody text-[#F2F2F2]/80 break-words text-justify text-lg font-medium"
      ></div>
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
.articleBody {
  color: #f2f2f2;
  opacity: 0.8;
  overflow: hidden;
}
.articleBody h2 {
  font-size: 1.875rem /* 30px */ !important;
  line-height: 2.25rem /* 36px */ !important;
  color: #f2f2f2 !important;
}
.articleBody h3 {
  font-size: 1.5rem /* 24px */ !important;
  line-height: 2rem /* 32px */ !important;
  color: #f2f2f2 !important;
}
.articleBody h4 {
  font-size: 1.25rem /* 20px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
}
.articleBody h5 {
  font-size: 1.125rem /* 18px */ !important;
  line-height: 1.75rem /* 28px */ !important;
  color: #f2f2f2 !important;
}
.articleBody h6 {
  font-size: 1rem /* 16px */ !important;
  line-height: 1.5rem /* 24px */ !important;
  color: #f2f2f2 !important;
}

.articleBody pre {
  max-width: 100%;
  background-color: rgb(0 0 0 / 0.5);
  margin-block: 19px;
  border-radius: 0.125rem /* 2px */;
  font-size: 1rem /* 16px */;
  line-height: 1.5rem /* 24px */;
  overflow-x: scroll;
  -webkit-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  -moz-box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  box-shadow: inset 7px 7px 12px -4px rgba(0, 0, 0, 1);
  padding: 1em !important;
  box-sizing: content-box;
}
.articleBody code {
  width: 90%;
  color: white;
  font-weight: 300;
  box-sizing: content-box;
  margin-left: 14px;
}
</style>
