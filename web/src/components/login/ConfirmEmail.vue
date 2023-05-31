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
    <div class="flex items-center justify-center w-full mb-4">
      <div
        class="border border-dashed border-[#ccc]/50 rounded-md w-fit relative"
      >
        <div
          class="text-2xl text-white/50 pointer-events-none absolute left-1/2 -translate-x-1/2 font-bold tracking-widest whitespace-nowrap"
        >
          Paste here
        </div>
        <input
          @paste="handlePaste"
          type="text"
          class="bg-transparent cursor-pointer w-[155px] h-[32px] outline-none caret-transparent z-50 opacity-0"
        />
      </div>
    </div>
    <div class="flex items-center justify-center gap-x-8 w-full">
      <CodeInput
        v-for="index in 6"
        :index="index"
        :key="index"
        :pastedCode="pastedCode"
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
