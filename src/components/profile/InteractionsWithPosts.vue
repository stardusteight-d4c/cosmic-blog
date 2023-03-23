<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import star from '@/assets/star.svg'
import comment from '@/assets/comment.svg'
import PostCard from '@globals/PostCard.vue'
import memoji from '@/assets/my-memoji02.png'

const route = useRoute()
const username = Array.isArray(route.params.username)
  ? route.params.username[0]
  : route.params.username ?? ''
const editSocialLinks = ref(false)

function closedEditSocialLinksPopUpObserver() {
  editSocialLinks.value = false
}
</script>
<template>
  <div class="grid grid-cols-2 gap-x-4 mt-16">
    <div class="col-span-1">
      <div
        class="flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20"
      >
        <h3 class="text-xl text-[#f2f2f2]/70 font-medium">Starred</h3>
        <img :src="star" class="w-6" />
      </div>
      <div class="flex flex-col items-center gap-y-4 mt-4">
        <PostCard :full="false" />
        <PostCard :full="false" />
        <PostCard :full="false" />
      </div>
    </div>
    <div class="col-span-1">
      <div
        class="flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20"
      >
        <h3 class="text-xl text-[#f2f2f2]/70 font-medium">Comments</h3>
        <img :src="comment" class="w-6" />
      </div>
      <div class="flex flex-col mb-28 items-center gap-y-4 mt-4">
        <div
          class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer"
        >
          <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
            GO! RN - Gestão de conhecimento focado em evolução do time
          </h2>
          <div
            class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
          >
            <img
              :src="memoji"
              class="w-12 rounded-full -ml-2"
            />
            #{{ username }}
          </div>
          <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque at
            et voluptatem iusto ex impedit quod eos asperiores placeat libero,
            qui dicta esse in, vero explicabo laboriosam sequi, cupiditate
            deserunt.</span
          >
        </div>
        <div
          class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer"
        >
          <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
            GO! RN - Gestão de conhecimento focado em evolução do time
          </h2>
          <div
            class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
          >
            <img
              :src="memoji"
              class="w-12 rounded-full -ml-2"
            />
            #{{ username }}
          </div>
          <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque at
            et voluptatem iusto ex impedit quod eos asperiores placeat libero,
            qui dicta esse in, vero explicabo laboriosam sequi, cupiditate
            deserunt.</span
          >
        </div>
        <div
          class="bg-[#252525] p-2 rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer"
        >
          <h2 class="leading-5 h-[40px] line-clamp-2 font-medium">
            GO! RN - Gestão de conhecimento focado em evolução do time
          </h2>
          <div
            class="text-base my-2 font-medium text-[#F2F2F2] flex items-center gap-x-1"
          >
            <img
              :src="memoji"
              class="w-12 rounded-full -ml-2"
            />
            #{{ username }}
          </div>
          <span class="line-clamp-5 text-sm text-[#F2F2F2]/60"
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque at
            et voluptatem iusto ex impedit quod eos asperiores placeat libero,
            qui dicta esse in, vero explicabo laboriosam sequi, cupiditate
            deserunt.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
