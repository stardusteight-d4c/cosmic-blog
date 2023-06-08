<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass, X, Note, User } from '@/components/@globals/atoms/icons'
import { searchBarStyles as css } from './styles'

const setSearch = ref(false)
const filter = ref<'post' | 'user'>('post')

function toggleFilter() {
  if (filter.value === 'post') {
    filter.value = 'user'
  } else if (filter.value === 'user') {
    filter.value = 'post'
  }
}
</script>

<template>
  <div :class="css.wrapper">
    <div
      @click="setSearch = !setSearch"
      :key="String(setSearch)"
      :class="css.searchIconContainer"
    >
      <MagnifyingGlass width="24" height="24" v-if="setSearch === false" />
      <X width="24" height="24" v-else :size="24" />
    </div>
    <div v-if="setSearch" :class="css.searchContainer">
      <input type="text" :placeholder="`Search for a ${filter}`" :class="css.input" />
      <div :class="css.fadersContainer">
        <Note v-if="filter === 'post'" @click="toggleFilter" width="24" height="24" />
        <User v-if="filter === 'user'" @click="toggleFilter" width="24" height="24" />
      </div>
    </div>
  </div>
</template>
