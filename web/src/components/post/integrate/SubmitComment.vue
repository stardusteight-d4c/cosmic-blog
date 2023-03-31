<script setup lang="ts">
import { ref, watch } from 'vue'
import Send from '@globals/atoms/icons/Send.vue'
import Btn from '@globals/Btn.vue'
import memoji from '@/assets/my-memoji02.png'
import { submitCommentStyles as css } from './styles'

const comment = ref('')
const countCharacters = ref(0)

watch(comment, (newValue) => {
  countCharacters.value = newValue.length
})
</script>

<template>
  <div :class="css.wrapper">
    <img :src="memoji" :class="css.memoji" />
    <div :class="css.contentContainer">
      <div :class="css.triangleSubmit" />
      <textarea
        v-model="comment"
        placeholder="Leave a feedback or comment about it :)"
        :spellcheck="false"
        :class="css.textarea"
      />
      <div :class="css.footerContainer">
        <span :class="css.handleCountColor(countCharacters)"
          >{{ countCharacters }}/500</span
        >
        <Btn title="Submit" :disabled="countCharacters > 500">
          <template #icon> <Send size="16" /></template>
        </Btn>
      </div>
    </div>
  </div>
</template>
