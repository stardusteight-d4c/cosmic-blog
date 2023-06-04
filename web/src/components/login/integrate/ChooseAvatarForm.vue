<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChooseAvatarPopUp } from '@/components/pop-ups'
import avatarPlaceholder from '@/assets/avatar-placeholder.svg'
import { ArrowUUPLeft } from '@/components/@globals/atoms/icons'
import { chooseAvatarFormStyles as css } from './styles'
import ConfirmEmail from '../ConfirmEmail.vue'
import useNotificator from '@/hooks/Notificator'
import { useAppStore } from '@/store'
import { getAvatarUrlById } from '@/utils'
import { ACTION_EMAIL_VERIFY } from '@/store/modules/login/actions'
import { MUTATION_SIGN_UP_DATA } from '@/store/modules/login/mutations'

const emit = defineEmits(['backStep'])

const { notify } = useNotificator()
const store = useAppStore()
const proceedToChooseAvatar = ref(false)
const proceedToConfirmEmail = ref(false)
const encryptedCode = ref()
const selectedAvatar = ref<null | string>(null)
const signUpData = computed(() => store.state.login.signUpData)

async function handleProceedToConfirmEmail() {
  encryptedCode.value = await store.dispatch(
    ACTION_EMAIL_VERIFY,
    signUpData.value.email
  )
  notify('SUCCESS', 'Code sent to registered email!')
  proceedToConfirmEmail.value = true
}

function closedChooseAvatar(): void {
  proceedToChooseAvatar.value = false
}
function selectedChooseAvatarPopUp(payload: { id: string }): void {
  selectedAvatar.value = payload.id
}

function handleBackStep(): void {
  emit('backStep')
}

const avatarUrl = computed((): string | undefined => {
  store.commit(MUTATION_SIGN_UP_DATA, {
    ...signUpData.value,
    selectedAvatar: selectedAvatar.value,
  })
  return getAvatarUrlById(selectedAvatar.value!)
})


</script>

<template>
  <ConfirmEmail
    v-if="proceedToConfirmEmail === true"
    :encryptedCode="encryptedCode"
  />
  <main v-if="proceedToConfirmEmail === false">
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
          @selectedChooseAvatarPopUp="selectedChooseAvatarPopUp"
          @closedChooseAvatarPopUp="closedChooseAvatar"
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
      <button
        @click="handleProceedToConfirmEmail"
        :disabled="selectedAvatar === null"
        :class="css.createBtn"
      >
        Create
      </button>
    </div>
  </main>
</template>
