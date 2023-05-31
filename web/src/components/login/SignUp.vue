<script setup lang="ts">
import { ref } from 'vue'
import { LabelSpan, ChooseAvatarForm } from './integrate'
import { calculateDelay } from '@/utils/calculate-delay'
import { signUpStyles as css } from './styles'

const emit = defineEmits(['changeToSignIn'])

const usernameSpan = 'Username'.split('')
const emailSpan = 'Email'.split('')
const passwordSpan = 'Password'.split('')
const confirmPasswordSpan = 'Confirm Password'.split('')

const nextStep = ref<boolean>(false)
const formData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function backStep(): void {
  nextStep.value = false
}
function handleSignIn(): void {
  emit('changeToSignIn', 'SignIn')
}
</script>

<template>
  <div :class="css.wrapper">
    <form
      @submit="nextStep = true"
      v-if="nextStep === false"
    >
      <div :class="css.headerContainer">
        <h1 :class="css.title">Sign Up</h1>
        <span :class="css.alreadyHaveAnAccountSpan"
          >Already have an account?
          <span :class="css.signInSpan" @click="handleSignIn">Sign In</span>
        </span>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.username" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in usernameSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
        <div :class="css.formControl">
          <input v-model="formData.email" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in emailSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.password" type="password" required="true" />
          <label>
            <LabelSpan
              v-for="(letter, index) in passwordSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
        <div :class="css.formControl">
          <input v-model="formData.confirmPassword" type="password" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in confirmPasswordSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
      </div>
      <button type="submit" :class="css.nextBtn">Next</button>
    </form>
    <ChooseAvatarForm @backStep="backStep" v-if="nextStep === true" />
  </div>
</template>
