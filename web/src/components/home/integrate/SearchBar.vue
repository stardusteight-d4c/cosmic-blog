<script setup lang="ts">
import { ref } from 'vue'
import {
  MagnifyingGlass,
  X,
  Note,
  User,
} from '@/components/@globals/atoms/icons'
import { searchBarStyles as css } from './styles'
import { useAppStore } from '@/store'
import { postMethods } from '@/store/modules/post'

const setSearch = ref(false)
const term = ref('')
const store = useAppStore()

async function handleExit() {
  term.value = ''
  const currentPageElement = document.getElementById('home-current-page')
  const currentPageValue = currentPageElement?.innerText
  await store.dispatch(postMethods.actions.GET_HOME_POSTS, {
    skip: Number(currentPageValue) * 6,
  })
}

async function search() {
  if (term.value.length > 3) {
    const posts = await store.dispatch(postMethods.actions.SEARCH_BY_TITLE, {
      title: term.value,
    })
    store.commit(postMethods.mutations.HOME_POSTS, posts)
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
      <X @click="handleExit" width="24" height="24" v-else :size="24" />
    </div>
    <div v-if="setSearch" :class="css.searchContainer">
      <input
        @input="search"
        type="text"
        v-model="term"
        placeholder="Search for a post"
        :class="css.input"
      />
      <div :class="css.fadersContainer">
        <Note width="24" height="24" />
      </div>
    </div>
  </div>
</template>
