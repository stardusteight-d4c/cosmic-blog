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
const filter = ref<'post' | 'user'>('post')
const term = ref('')
const store = useAppStore()

function toggleFilter() {
  if (filter.value === 'post') {
    filter.value = 'user'
  } else if (filter.value === 'user') {
    filter.value = 'post'
  }
}

async function handleExit() {
  await store.dispatch(postMethods.actions.GET_HOME_POSTS, { skip: 0 })
}

async function search() {
  if (term.value.length > 4) {
    await store.dispatch(postMethods.actions.SEARCH_BY_TITLE, {
      title: term.value,
    })
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
        :placeholder="`Search for a ${filter}`"
        :class="css.input"
      />
      <div :class="css.fadersContainer">
        <Note
          v-if="filter === 'post'"
          @click="toggleFilter"
          width="24"
          height="24"
        />
        <User
          v-if="filter === 'user'"
          @click="toggleFilter"
          width="24"
          height="24"
        />
      </div>
    </div>
  </div>
</template>
