<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChooseAvatarPopUp } from '@/components/pop-ups'
import { chooseAvatars } from '@/utils/data'
import avatarPlaceholder from '@/assets/avatar-placeholder.svg'
import { ArrowUUPLeft } from '@globals/atoms/icons'
import { chooseAvatarFormStyles as css } from './styles'

const emit = defineEmits(['backStep'])

const proceedToChooseAvatar = ref(false)
const selectedAvatar = ref<null | string>(null)

function closedChooseAvatarObserver(): void {
  proceedToChooseAvatar.value = false
}
function selectedChooseAvatarPopUpObserver(payload: { id: string }): void {
  selectedAvatar.value = payload.id
}
function getUrlById(id: string): string | undefined {
  const avatar = chooseAvatars.find((avatar) => avatar.id === id)
  return avatar?.url
}
function handleBackStep(): void {
  emit('backStep')
}

const avatarUrl = computed((): string | undefined => {
  return getUrlById(selectedAvatar.value!)
})
</script>

<template>
  <h2 :class="css.title">Choose your avatar!</h2>
  <div :class="css.avatarWrapper">
    <div :class="css.avatarContainer">
      <img
        v-if="selectedAvatar === null"
        @click="proceedToChooseAvatar = true"
        :src="avatarPlaceholder"
        :class="css.placeholderAvatarImage"
      />
      <ChooseAvatarPopUp
        @selectedChooseAvatarPopUp="selectedChooseAvatarPopUpObserver"
        @closedChooseAvatarPopUp="closedChooseAvatarObserver"
        v-if="proceedToChooseAvatar"
      />
      <div
        @click="proceedToChooseAvatar = true"
        v-if="selectedAvatar"
        :class="css.selectedAvatarContainer"
      >
        <img :src="avatarUrl!" :class="css.avatarImage" />
        <div :class="css.boxAnimate" />
        <div :class="css.backgroundOverlay" />
      </div>
    </div>
  </div>
  <div :class="css.buttonsContainer">
    <button @click="handleBackStep" :class="css.backStepBtn">
      <ArrowUUPLeft width="20" height="20" /> Back
    </button>
    <button :disabled="selectedAvatar === null" :class="css.createBtn">
      Create
    </button>
  </div>
</template>
