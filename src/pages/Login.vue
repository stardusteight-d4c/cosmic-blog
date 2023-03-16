<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import Navbar from '@/components/navbar/Navbar.vue'
import ChooseAvatarPopUp from '@/components/ChooseAvatarPopUp.vue'
import { chooseAvatars } from '@/utils/mock-data'
import ArrowRight from '@/atoms/icons/ArrowRight.vue'

export default defineComponent({
  name: 'Login',
  components: { Navbar, ChooseAvatarPopUp, ArrowRight },
  setup() {
    const proceedToChooseAvatar = ref(false)
    const selectedAvatar = ref<null | string>(null)

    function closedChooseAvatarObserver() {
      proceedToChooseAvatar.value = false
    }
    function selectedChooseAvatarPopUpObserver(payload: { id: string }) {
      console.log(payload.id)

      selectedAvatar.value = payload.id
    }

    function getUrlById(id: string): string | undefined {
      const avatar = chooseAvatars.find((avatar) => avatar.id === id)
      return avatar?.url
    }

    const avatarUrl = computed(() => {
      return getUrlById(selectedAvatar.value!)
    })

    return {
      proceedToChooseAvatar,
      selectedAvatar,
      avatarUrl,
      chooseAvatars,
      closedChooseAvatarObserver,
      selectedChooseAvatarPopUpObserver,
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
      <div
        class="w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-28 rounded-sm"
      >
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold">Sign Up</h1>
          <span class="text-center inline-block text-lg text-[#F2F2F2]/70 mt-2"
            >Already have an account? <span class="text-blue-500 hover:underline cursor-pointer">Sign In</span>
          </span>
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
        <!-- <div class="mt-4">
            <h2 class="text-2xl text-center font-bold mb-8">
              Choose your avatar!
            </h2>
            <div class="w-full flex items-center justify-center h-32 relative">
              <div
                class="w-32 h-32 rounded-full relative cursor-pointer flex items-center justify-center"
              >
                <img
                  v-if="selectedAvatar === null"
                  @click="proceedToChooseAvatar = true"
                  src="../assets/avatar-placeholder.svg"
                  class="inner-shadow w-32 bg-[#1A1A1A] transition-all duration-500 hover:scale-110 ease-in-out active:scale-95 absolute z-[100] rounded-full object-cover"
                />
                <ChooseAvatarPopUp
                  @selectedChooseAvatarPopUp="selectedChooseAvatarPopUpObserver"
                  @closedChooseAvatarPopUp="closedChooseAvatarObserver"
                  v-if="proceedToChooseAvatar"
                />
                <div
                  @click="proceedToChooseAvatar = true"
                  v-if="selectedAvatar"
                  class="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    :src="avatarUrl!"
                    class="pendulum overflow-visible absolute pointer-events-none w-64 z-[100] mx-auto"
                  />
                  <div
                    class="box-animate w-32 h-32 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto"
                  />
                  <div
                    class="inner-shadow w-[120px] h-[120px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div> -->
        <button class="w-fit text-xl mx-auto mt-8 font-semibold">
          <ArrowRight />
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 0 10px #00000080;
}
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
  transform: scale(.9) !important;
  transition: all 100ms ease;
}

button svg {
  width: 16px;
}
</style>
