<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'

export default defineComponent({
  name: 'Login',
  components: { Navbar },
})
</script>

<template>
  <div class="bg-[#1a1a1a] text-[#F2F2F2] min-h-screen w-screen">
    <div class="max-w-[725px] h-full w-full mx-auto mb-8">
      <Navbar path="login" />
      <div class="shadowww w-[650px] mx-auto p-4 bg-[#252525] rounded-sm">
        <div>
          <h1 class="text-4xl font-bold mb-8">Sign Up</h1>
        </div>
        <div class="flex items-center gap-x-4">
          <div class="form-control">
            <input type="value" required />
            <label>
              <span style="transition-delay: 0ms">U</span>
              <span style="transition-delay: 50ms">s</span>
              <span style="transition-delay: 100ms">e</span>
              <span style="transition-delay: 150ms">r</span>
              <span style="transition-delay: 200ms">n</span>
              <span style="transition-delay: 250ms">a</span>
              <span style="transition-delay: 300ms">m</span>
              <span style="transition-delay: 350ms">e</span>
            </label>
          </div>
          <div class="form-control">
            <input type="value" required />
            <label>
              <span style="transition-delay: 0ms">E</span>
              <span style="transition-delay: 50ms">m</span>
              <span style="transition-delay: 100ms">a</span>
              <span style="transition-delay: 150ms">i</span>
              <span style="transition-delay: 200ms">l</span>
            </label>
          </div>
        </div>
        <div class="flex items-center gap-x-4">
          <div class="form-control">
            <input type="value" required />
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
            <input type="value" required />
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
        <div>
          <h2 class="text-2xl font-bold text-center">Select your avatar!</h2>
          <div class="w-full flex items-center justify-center h-48 relative">
            <div
              class="box-animate w-28 h-28 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto"
            />
            <div
              class="w-[105px] h-[105px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto"
            />
            <img
              src="../assets/avatar01.png"
              class="pendulum absolute pointer-events-none w-32 z-[100] mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadowww {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
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

.box-animate {
  animation: scale 1s infinite alternate;
}

@keyframes scale {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1.1);
  }
}

.pendulum {
  transform-origin: 50% 0%;
  animation: pendulum 2.5s ease-in-out infinite;
}

@keyframes pendulum {
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}
</style>
