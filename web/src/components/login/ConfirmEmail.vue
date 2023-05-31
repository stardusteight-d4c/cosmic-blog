<script setup lang="ts">
import { ref } from 'vue'
import CodeInput from './integrate/CodeInput.vue'
import useNotificator from '@/hooks/Notificator'

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
      type="submit"
      class="form-login-button w-fit text-xl mx-auto mt-8 font-semibold"
    >
      Confirm
    </button>
  </main>
</template>
