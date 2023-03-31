<script setup lang="ts">
import { calculateDelay } from '@/utils/calculate-delay';
import { LabelSpan } from './integrate'
import { signInStyles as css } from './styles'

const emit = defineEmits(['changeToSignUp'])

const usernameOrEmailSpan = 'Username or Email'.split('')
const passwordSpan = 'Password'.split('')
const confirmPasswordSpan = 'Confirm Password'.split('')

const formData = {
  usernameOrEmail: '',
  password: '',
  confirmPassword: '',
}

function handleSignUp(): void {
  emit('changeToSignUp', 'SignUp')
}
</script>

<template>
  <div :class="css.wrapper">
    <form>
      <div :class="css.headerContainer">
        <h1 :class="css.title">Sign In</h1>
        <span :class="css.dontHaveAccountSpan"
          >Don't have an account?
          <span :class="css.signUpSpan" @click="handleSignUp">Sign Up</span>
        </span>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.usernameOrEmail" type="text" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in usernameOrEmailSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
      </div>
      <div :class="css.flexCenterGapX4">
        <div :class="css.formControl">
          <input v-model="formData.password" type="password" required />
          <label>
            <LabelSpan
              v-for="(letter, index) in passwordSpan"
              :letter="letter"
              :delay="calculateDelay(index)"
            />
          </label>
        </div>
        <div class="form-control">
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
      <button type="submit" :class="css.submitBtn">Sign In</button>
    </form>
  </div>
</template>
