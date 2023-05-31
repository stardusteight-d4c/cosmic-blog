<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { EditProfileSocialLinksPopUp } from '@/components/pop-ups'
import { PencilLine } from '@/components/@globals/atoms/icons'
import memoji from '@/assets/my-memoji02.png'
import { headerStyles as css } from './styles'

const route = useRoute()
const username = Array.isArray(route.params.username)
  ? route.params.username[0]
  : route.params.username ?? ''
const editSocialLinks = ref(false)

function closedEditSocialLinksPopUp() {
  editSocialLinks.value = false
}
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.boxAnimate" />
    <div :class="css.backgroundOverlay" />
    <div :class="css.avatarImageWrapper">
      <img :src="memoji" :class="css.avatarImage" />
      <PencilLine
        @click="editSocialLinks = true"
        width="38"
        height="38"
        :class="css.editIcon"
      />
      <EditProfileSocialLinksPopUp
        v-if="editSocialLinks"
        @closedEditProfileSocialLinksPopUp="closedEditSocialLinksPopUp"
      />
    </div>
  </div>
  <h1 :class="css.username">#{{ username }}'s Profile</h1>
</template>
