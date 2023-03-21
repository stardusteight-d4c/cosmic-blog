<script setup lang="ts">
import Tag from '@/components/globals/integrate/Tag.vue'
import Star from '@globals/atoms/icons/Star.vue'
import coverPlaceholder from '@/assets/cover-placeholder.webp'
import { articleHeaderStyles as css } from './styles'

defineProps({
  coverImage: {
    type: String,
  },
  tags: {
    type: Array<string>,
  },
})
</script>

<template>
  <div :class="css.wrapper">
    <img
      :src="coverImage === '' ? coverPlaceholder : coverImage"
      :class="css.cover"
    />
    <div :class="css.tagsContainer">
      <Tag v-for="tag in tags" :tag="tag" />
    </div>
    <div :class="css.favoriteWrapper">
      <div :class="css.favoriteContainer">
        <Star :class="css.starIcon" />
        <div :class="css.dropDownContainer">
          <div :class="css.triangle" />
          <span>Favorite</span>
        </div>
      </div>
    </div>
  </div>
</template>
