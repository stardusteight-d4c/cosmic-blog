<script setup lang="ts">
import { Arrow } from '@/components/@globals/atoms/icons'
import { paginationStyles as css } from './styles'
import { IComment } from '@/@interfaces/comment'

interface IProps {
  comments: IComment[]
  currentPage: number
  back: () => Promise<void>
  next: () => Promise<void>
}

defineProps<IProps>()
</script>

<template>
  <div>
    <!-- <span
      class="block text-center md:font-medium md:text-xl mt-8 text-[#f2f2f2]/70"
    >
      There are no posts yet
    </span> -->
  </div>
  <div :class="css.wrapper">
    <Arrow @click="back" width="42" height="42" :class="css.arrowLeft" />
    <span :class="css.pageCount">{{ currentPage }}</span>
    <Arrow @click="next" width="42" height="42" :class="css.arrowRight" />
  </div>
</template>
