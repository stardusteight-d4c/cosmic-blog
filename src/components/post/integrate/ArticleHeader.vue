<script lang="ts">
import { defineComponent } from 'vue'
import Star from '@/atoms/icons/Star.vue'
import CoverPlaceholder from '@/assets/cover-placeholder.webp'

export default defineComponent({
  name: 'ArticleHeader',
  components: { Star },
  props: {
    coverImage: {
      type: String,
    },
    tags: {
      type: Array<string>,
    },
  },
  setup(props, ctx) {
    return {
      CoverPlaceholder,
    }
  },
})
</script>

<template>
  <div class="relative">
    <img
      :src="coverImage === '' ? CoverPlaceholder : coverImage"
      class="w-full h-[325px] rounded-t-sm object-cover"
    />
    <div class="mt-2 text-sm absolute cursor-default left-4 top-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="shadow-black/50 shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2"
        >{{ tag }}</span
      >
    </div>
    <div
      class="shadow-black/50 shadow-md absolute right-4 top-2 mt-1 p-[2px] rounded-sm border-[#F2F2F2]/20 bg-[#1a1a1a]"
    >
      <Star color="#F2F2F280" class="w-8 h-8 cursor-pointer" />
    </div>
  </div>
</template>
