<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { EditProfileSocialLinksPopUp } from '@/components/pop-ups'
import { PencilLine } from '@/components/@globals/atoms/icons'
import { headerStyles as css } from './styles'
import { useAppStore } from '@/store'
import { getAvatarUrlById } from '@/utils/getAvatarUrlById'

const route = useRoute()
const store = useAppStore()
const userData = computed(() => store.state.user.userData)
console.log(userData.value)

const userAvatar = getAvatarUrlById(userData.value.avatar)
console.log(userData.value.avatar)
console.log(userAvatar)
const handledAvatarString = userAvatar?.replace(/-\d+\.png$/, '-')

console.log('handledAvatarString', handledAvatarString)

const editSocialLinks = ref(false)
function closedEditSocialLinksPopUp() {
  editSocialLinks.value = false
}

let currentMemoji = ref(1)
function handleMemoji(): void {
  if (currentMemoji.value < 3) {
    currentMemoji.value++
  } else if (currentMemoji.value === 3) {
    currentMemoji.value = 1
  }
}
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.boxAnimate" />
    <div :class="css.backgroundOverlay" />
    <div :class="css.avatarImageWrapper">
      <img
        @click="handleMemoji"
        :src="`${handledAvatarString}${currentMemoji}.png`"
        :class="css.avatarImage"
      />
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
  <h1 :class="css.username">#{{ userData.username }}'s Profile</h1>
</template>
