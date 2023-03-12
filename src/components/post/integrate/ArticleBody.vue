<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import {
  Chat as ChatIcon,
  Star as StarIcon,
  Calendar as CalendarIcon,
} from '@/atoms/icons'
import * as marked from 'marked'
import { dateFormat } from '@/utils/date-format'
import Prism from 'prismjs'


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

    setTimeout(() => {
      const jsBlockElement = document.querySelectorAll('code.language-js')
      console.log('jsBlockElement', jsBlockElement)

      jsBlockElement.forEach((element) => {
        console.log('aaaaaa')

        element.classList.add('language-javascript')
      })
    }, 500)

    window.Prism = window.Prism || {};
    window.Prism.manual = true;
    Prism.highlightAll(); // highlight your code on mount

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
  @apply text-[#F2F2F2]/90;
}
.articleBody h2 {
  @apply !text-3xl !text-[#F2F2F2];
}
.articleBody h3 {
  @apply !text-2xl !text-[#F2F2F2];
}
.articleBody h4 {
  @apply !text-xl !text-[#F2F2F2];
}
.articleBody h5 {
  @apply !text-lg !text-[#F2F2F2];
}
.articleBody h6 {
  @apply !text-base !text-[#F2F2F2];
}
/* .articleBody pre {
  @apply w-full bg-black/50 overflow-x-scroll rounded-sm p-4 text-base;
}
.articleBody code {
  @apply w-full overflow-scroll;
} */
</style>
