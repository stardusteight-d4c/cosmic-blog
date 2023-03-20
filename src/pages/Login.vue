<script lang="ts">
import { defineComponent, ref } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'

import SignUp from '@/components/login/SignUp.vue'
import SignIn from '@/components/login/SignIn.vue'

export default defineComponent({
  name: 'Login',
  components: {
    Navbar,
    SignUp,
    SignIn,
  },
  setup() {
    const typeOfLogin = ref<'SignIn' | 'SignUp'>('SignIn')

    const changeToSignInObserver = (payload: 'SignIn') => {
      typeOfLogin.value = payload
    }
    const changeToSignUpObserver = (payload: 'SignIn') => {
      typeOfLogin.value = payload
    }

    return {
      typeOfLogin,
      changeToSignInObserver,
      changeToSignUpObserver,
    }
  },
})
</script>

<template>
  <div
    class="bg-[#1a1a1a] text-[#F2F2F2] h-full max-h-screen w-screen overflow-hidden"
  >
    <portal-target name="chooseAvatarPopUp"></portal-target>
    <div class="max-w-[725px] relative min-h-screen w-full mx-auto">
      <Navbar path="login" />
      <SignUp
        @changeToSignIn="changeToSignInObserver"
        v-if="typeOfLogin === 'SignUp'"
      />
      <SignIn
        @changeToSignUp="changeToSignUpObserver"
        v-if="typeOfLogin === 'SignIn'"
      />
    </div>
  </div>
</template>
