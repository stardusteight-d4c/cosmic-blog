<script setup lang="ts">
import { ref } from 'vue'
import { EditProfileSocialLinksPopUp } from '@/components/pop-ups'
import { PencilLine } from '@/components/@globals/atoms/icons'
import { headerStyles as css } from './styles'

defineProps({
  avatarUrl: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
})

const editSocialLinks = ref(false)
let currentMemoji = ref(1)

function closedEditSocialLinksPopUp() {
  editSocialLinks.value = false
}

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
      <div class="pendulum relative z-[50]">
        <img
          @click="handleMemoji"
          :src="`${avatarUrl}${currentMemoji}.png`"
          v-bind:key="currentMemoji"
          :class="css.avatarImage"
        />
      </div>
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

<style scoped>
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.animated-bounce {
  animation: bounce ease-in-out 0.3s;
}
</style>
