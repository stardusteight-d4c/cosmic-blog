<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostCard',
  props: {
    full: {
      type: Boolean,
      required: true,
    },
  },
  setup() {},
})
</script>

<template>
  <router-link
    to="/post/455446461"
    class="col-span-1 cursor-pointer overflow-hidden w-full h-fit rounded-sm hover:shadow-md hover:shadow-black/20 hover:scale-[1.02] transition-all duration-100 ease-linear"
  >
    <div class="overflow-hidden">
      <img
        v-if="full"
        src="https://www.paulsblog.dev/content/images/size/w2000/2022/09/image--41-.webp"
        class="h-[195px] w-full object-cover"
      />
      <div class="bg-[#252525] p-2">
        <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
          GO! RN - Gestão de conhecimento focado em evolução do time
        </h2>
        <div
          class="text-xs my-2 font-medium text-[#F2F2F2]/60 flex items-center gap-x-1"
        >
          <ph-calendar-blank :size="18" />Mar 5, 2023
        </div>
        <span class="line-clamp-3 text-sm text-[#F2F2F2]/60"
          >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque at
          et voluptatem iusto ex impedit quod eos asperiores placeat libero, qui
          dicta esse in, vero explicabo laboriosam sequi, cupiditate
          deserunt.</span
        >
        <div class="mt-2 text-sm">
          <span
            class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
            >#Javascript</span
          >
          <span
            class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
            >#Node.js</span
          >
          <span
            class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
            >#React</span
          >
          <span
            class="inline-block lowercase bg-[#1a1a1a] p-1 rounded-sm text-xs mr-2"
            >#Vue.js</span
          >
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
