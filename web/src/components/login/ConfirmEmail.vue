<script setup lang="ts">
import { ref } from 'vue'
import CodeInput from './integrate/CodeInput.vue'
import useNotificator from '@/hooks/Notificator'
import bcryptjs from 'bcryptjs'

const props = defineProps({
  encryptedCode: {
    type: String,
    required: true,
  },
})

const { notify } = useNotificator()

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

function confirmCode() {
  const code = getCombinedInputValue()
  console.log(props.encryptedCode, code)
  const isCodeValid = bcryptjs.compareSync(code, props.encryptedCode)
  console.log('isCodeValid', isCodeValid)
  if (isCodeValid) {
    notify('SUCCESS', 'A valid code was entered!')
  } else {
    notify('ERROR', 'A valid code was not entered!')
  }
}
</script>

<template>
  <main>
    <h2 class="text-3xl md:text-4xl text-center font-bold mb-14">
      Confirm your email address!
    </h2>
    <div class="flex items-center justify-center gap-x-8 w-full">
      <CodeInput
        v-for="index in 6"
        :index="index"
        :key="index"
        :pastedCode="pastedCode"
        @paste="handlePaste"
      />
    </div>
    <button
      @click="confirmCode"
      class="form-login-button w-fit text-xl mx-auto mt-8 font-semibold"
    >
      Confirm
    </button>
  </main>
</template>
