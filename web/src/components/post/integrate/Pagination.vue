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
  <div
    v-if="!(currentPage === 0 && comments.length === 0)"
    :class="css.wrapper"
  >
    <Arrow
      v-if="currentPage !== 0"
      @click="back"
      width="42"
      height="42"
      :class="css.arrowLeft"
    />
    <span :class="css.pageCount">{{ currentPage }}</span>
    <Arrow
      v-if="comments.length >= 4"
      @click="next"
      width="42"
      height="42"
      :class="css.arrowRight"
    />
  </div>
  <div>
    <span
      v-if="comments.length === 0"
      class="block text-center md:font-medium md:text-xl mt-8 text-[#f2f2f2]/70"
    >
      There are no comments yet
    </span>
  </div>
</template>
