<script setup lang="ts">
import Tag from '@globals/integrate/Tag.vue'
import Star from '@globals/atoms/icons/Star.vue'
import coverPlaceholder from '@/assets/cover-placeholder.webp'
import { articleHeaderStyles as css } from './styles'
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store'

interface IProps {
  coverImage?: string
  tags?: string[]
}
defineProps<IProps>()

const store = useAppStore()
let isGuest = computed(() => store.state.post.post?.isGuest ?? true) 
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
      <div v-if="!isGuest" :class="css.favoriteContainer">
        <Star :class="css.starIcon" />
        <div :class="css.dropDownContainer">
          <div :class="css.triangle" />
          <span>Favorite</span>
        </div>
      </div>
    </div>
  </div>
</template>
