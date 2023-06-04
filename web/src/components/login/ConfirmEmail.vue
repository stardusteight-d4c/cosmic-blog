<script setup lang="ts">
import { computed, ref } from 'vue'
import CodeInput from './integrate/CodeInput.vue'
import useNotificator from '@/hooks/Notificator'
import bcryptjs from 'bcryptjs'
import { useAppStore } from '@/store'
import { setCookie } from '@/utils'
import { useRouter } from 'vue-router'
import { IRegisterUserData } from '@/@interfaces/login'
import { loginMethods } from '@/store/modules/login'

const props = defineProps({
  encryptedCode: {
    type: String,
    required: true,
  },
})

const store = useAppStore()
const router = useRouter()
const { notify } = useNotificator()
const signUpData = computed(() => store.state.login.signUpData)
const pastedCode = ref<number[]>([])

function handlePaste(event: ClipboardEvent) {
  const pastedText = event.clipboardData?.getData('text')
  if (!pastedText) {
    return
  }
  if (pastedText?.length != 6) {
    notify('ERROR', 'A valid code was not entered!')
  }
  const arrayOfNumber = pastedText.split('').map((item) => Number(item))
  const isAllNumbers = arrayOfNumber.every(
    (elemento) => typeof elemento === 'number' && !Number.isNaN(elemento)
  )
  if (isAllNumbers) {
    pastedCode.value = arrayOfNumber
  } else {
    notify('ERROR', 'A valid code was not entered!')
  }
}

function getCombinedInputValue() {
  let combinedString = ''
  for (let i = 1; i <= 6; i++) {
    const inputId = `input-${i}`
    const inputElement = document.getElementById(inputId) as HTMLInputElement
    if (inputElement) {
      const inputValue = inputElement.value
      combinedString += inputValue
    }
  }
  return combinedString
}

async function confirmCode() {
  const code = getCombinedInputValue()
  const isCodeValid = bcryptjs.compareSync(code, props.encryptedCode)
  if (isCodeValid) {
    notify('SUCCESS', 'A valid code was entered!')
    const registerData: IRegisterUserData = {
      email: signUpData.value.email,
      avatar: signUpData.value.selectedAvatar!,
      username: signUpData.value.username,
      password: signUpData.value.password,
      userRole: 'reader',
    }
    const data = await store.dispatch(
      loginMethods.actions.REGISTER_USER,
      registerData
    )
    if (data) {
      setCookie(data.sessionToken)
      router.push(`/profile/${data.user.id}`)
    }
  } else {
    notify('ERROR', 'The code does not match the code sent!')
  }
}
</script>

<template>
  <main>
    <h2 class="text-3xl md:text-4xl text-center font-bold mb-14">
      Confirm your email address!
    </h2>
    <div class="flex flex-col items-center justify-center md:flex-row gap-8">
      <div class="flex items-center justify-center gap-8 w-full">
        <CodeInput
          v-for="index in 3"
          :index="index"
          :key="index"
          :pastedCode="pastedCode"
          @paste="handlePaste"
        />
      </div>
      <div class="flex items-center justify-center gap-8 w-full">
        <CodeInput
          v-for="index in 3"
          :index="index + 3"
          :key="index + 3"
          :pastedCode="pastedCode"
          @paste="handlePaste"
        />
      </div>
    </div>
    <button
      @click="confirmCode"
      class="form-login-button w-fit text-xl mx-auto mt-8 font-semibold"
    >
      Confirm
    </button>
  </main>
</template>
