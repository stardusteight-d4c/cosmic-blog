<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SignIn',
  setup(_props, { emit }) {
    function handleSignUp() {
      emit('changeToSignUp', 'SignUp')
    }

    return {
      handleSignUp,
    }
  },
})
</script>

<template>
  <div
    class="w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-28 rounded-sm"
  >
    <form>
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold">Sign In</h1>
        <span class="text-center inline-block text-lg text-[#F2F2F2]/70 mt-2"
          >Don't have an account?
          <span
            class="text-blue-500 hover:underline cursor-pointer"
            @click="handleSignUp"
            >Sign Up</span
          >
        </span>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="form-control">
          <input required />
          <label>
            <span style="transition-delay: 0ms">U</span>
            <span style="transition-delay: 50ms">s</span>
            <span style="transition-delay: 100ms">e</span>
            <span style="transition-delay: 150ms">r</span>
            <span style="transition-delay: 200ms">n</span>
            <span style="transition-delay: 250ms">a</span>
            <span style="transition-delay: 300ms">m</span>
            <span style="transition-delay: 350ms">e</span>
            <span style="transition-delay: 0ms"></span>
            <span style="transition-delay: 50ms">or</span>
            <span style="transition-delay: 100ms"></span>
            <span style="transition-delay: 150ms">E</span>
            <span style="transition-delay: 200ms">m</span>
            <span style="transition-delay: 250ms">a</span>
            <span style="transition-delay: 300ms">i</span>
            <span style="transition-delay: 350ms">l</span>
          </label>
        </div>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="form-control">
          <input type="password" required="true" />
          <label>
            <span style="transition-delay: 0ms">P</span>
            <span style="transition-delay: 50ms">a</span>
            <span style="transition-delay: 100ms">s</span>
            <span style="transition-delay: 150ms">s</span>
            <span style="transition-delay: 200ms">w</span>
            <span style="transition-delay: 250ms">o</span>
            <span style="transition-delay: 300ms">r</span>
            <span style="transition-delay: 350ms">d</span>
          </label>
        </div>
        <div class="form-control">
          <input type="password" required />
          <label>
            <span style="transition-delay: 0ms">C</span>
            <span style="transition-delay: 50ms">o</span>
            <span style="transition-delay: 100ms">n</span>
            <span style="transition-delay: 150ms">f</span>
            <span style="transition-delay: 250ms">i</span>
            <span style="transition-delay: 300ms">r</span>
            <span style="transition-delay: 350ms">m</span>
            <span style="transition-delay: 400ms"></span>
            <span style="transition-delay: 450ms">P</span>
            <span style="transition-delay: 500ms">a</span>
            <span style="transition-delay: 550ms">s</span>
            <span style="transition-delay: 600ms">s</span>
            <span style="transition-delay: 650ms">w</span>
            <span style="transition-delay: 700ms">o</span>
            <span style="transition-delay: 750ms">r</span>
            <span style="transition-delay: 800ms">d</span>
          </label>
        </div>
      </div>
      <button type="submit" class="w-fit text-xl mx-auto mt-8 font-semibold">
        Sign In
      </button>
    </form>
  </div>
</template>

<style scoped>
.shadowww {
  box-shadow: rgba(0, 0, 0, 0.459) 0px 20px 30px;
}
.form-control {
  position: relative;
  margin: 20px 0px;
  width: 100%;
}

.form-control input {
  background-color: #00000050;
  border: 0;
  border-radius: 2px;
  border-bottom: 2px #f2f2f2 solid;
  display: block;
  width: 100%;
  box-shadow: inset 0 0 10px #00000080;
  padding: 8px;
  font-size: 18px;
  color: #f2f2f2;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: #3b82f6;
}

.form-control label {
  position: absolute;
  bottom: 8px;
  left: 8px;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #f2f2f2;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: #3b82f6;
  transform: translateY(-34px) translateX(-8px);
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-image: linear-gradient(to top, #3b82f6, #8b5cf6);
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 18px;
  border-radius: 999px;
  transition: all 0.5s ease;
}

button:active {
  transform: scale(0.9) !important;
  transition: all 100ms ease;
}

button svg {
  width: 16px;
}
</style>
