<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ChooseAvatarPopUp from '@/components/login/integrate/ChooseAvatarPopUp.vue'
import { chooseAvatars } from '@/utils/mock-data'
import avatarPlaceholder from '@/assets/avatar-placeholder.svg'

export default defineComponent({
  name: 'ChooseAvatarForm',
  components: { ChooseAvatarPopUp },
  setup(_props, { emit }) {
    const proceedToChooseAvatar = ref(false)
    const selectedAvatar = ref<null | string>(null)

    function closedChooseAvatarObserver() {
      proceedToChooseAvatar.value = false
    }
    function selectedChooseAvatarPopUpObserver(payload: { id: string }) {
      selectedAvatar.value = payload.id
    }

    function getUrlById(id: string): string | undefined {
      const avatar = chooseAvatars.find((avatar) => avatar.id === id)
      return avatar?.url
    }

    function handleBackStep() {
      emit('backStep')
    }

    const avatarUrl = computed(() => {
      return getUrlById(selectedAvatar.value!)
    })

    return {
      assets: {
        avatarPlaceholder,
      },
      selectedAvatar,
      handleBackStep,
      proceedToChooseAvatar,
      closedChooseAvatarObserver,
      selectedChooseAvatarPopUpObserver,
      avatarUrl,
    }
  },
})
</script>

<template>
  <div class="mt-4">
    <h2 class="text-4xl text-center font-bold mb-8">Choose your avatar!</h2>
    <div class="w-full flex items-center justify-center h-32 relative">
      <div
        class="w-32 h-32 rounded-full relative cursor-pointer flex items-center justify-center"
      >
        <img
          v-if="selectedAvatar === null"
          @click="proceedToChooseAvatar = true"
          :src="assets.avatarPlaceholder"
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
    <div class="mx-auto w-fit flex items-center justify-center gap-x-5">
      <button
        @click="handleBackStep"
        class="flex mt-8 items-center justify-center gap-x-2 w-[115px] active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 bg-[#f2f2f2]/5"
      >
        <ph-arrow-u-up-left :size="20" class="font-bold" /> Back
      </button>
      <button
      :disabled="selectedAvatar === null"
        class="flex disabled:brightness-75 disabled:cursor-not-allowed mt-8 items-center justify-center  gap-x-2 w-[115px] active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 bg-blue-500"
      >
        Create
      </button>
    </div>
  </div>
</template>

<style scoped>
.inner-shadow {
  box-shadow: inset 0 0 10px #00000080;
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
