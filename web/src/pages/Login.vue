<script setup lang="ts">
import { ref } from 'vue'
import { BaseLayoutSlot } from '@/components/login'
import SignUp from '@/components/login/SignUp.vue'
import SignIn from '@/components/login/SignIn.vue'

const typeOfLogin = ref<'SignIn' | 'SignUp'>('SignIn')

function changeToSignInObserver(payload: 'SignIn') {
  typeOfLogin.value = payload
}
function changeToSignUpObserver(payload: 'SignIn') {
  typeOfLogin.value = payload
}
</script>

<template>
  <BaseLayoutSlot>
    <template #main>
      <SignIn
        @changeToSignUp="changeToSignUpObserver"
        v-if="typeOfLogin === 'SignIn'"
      />
      <SignUp
        @changeToSignIn="changeToSignInObserver"
        v-if="typeOfLogin === 'SignUp'"
      />
    </template>
  </BaseLayoutSlot>
</template>
