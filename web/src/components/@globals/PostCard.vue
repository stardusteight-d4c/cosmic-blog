<script setup lang="ts">
import { Calendar } from '@globals/atoms/icons'
import Tag from './integrate/Tag.vue'
import { postCardStyles as css } from './styles'
import dayjs from 'dayjs'

defineProps({
  isMinimalist: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  postedAt: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array<string>,
    required: true,
  },
})
</script>

<template>
  <router-link to="/post/455446461" :class="css.wrapper">
    <img
      v-if="!isMinimalist"
      src="https://www.paulsblog.dev/content/images/size/w2000/2022/09/image--41-.webp"
      :class="css.cover"
    />
    <div :class="css.infosContainer">
      <h2 :class="css.title">
        {{ title }}
      </h2>
      <div :class="css.calendarContainer">
        <Calendar width="18" height="18" />{{
          dayjs(postedAt).format('D[/]MMM[, ]YYYY')
        }}
      </div>
      <span :class="css.previewText">{{ content }}</span>
      <div :class="css.tagsContainer">
        <Tag v-for="tag in tags" :tag="tag" />
      </div>
    </div>
  </router-link>
</template>
