<script setup lang="ts">
import { ref } from 'vue'
import { MagnifyingGlass, X, Faders } from '@/components/@globals/atoms/icons'
import { searchBarStyles as css } from './styles'

const setSearch = ref(false)
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
      <input type="text" placeholder="Search for a post" :class="css.input" />
      <div :class="css.fadersContainer">
        <Faders width="24" height="24" />
      </div>
    </div>
  </div>
</template>
