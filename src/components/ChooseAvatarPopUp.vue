<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChooseAvatarPopUp',
  setup(_props, { emit }) {
    function handleCancel() {
      emit('closedChooseAvatarPopUp')
    }

    return {
      handleCancel,
    }
  },
})
</script>

<template>
  <portal to="chooseAvatarPopUp">
    <div class="inset-0 bg-black/40 z-[950] fixed" />
    <div
      class="bg-[#1a1a1a]/50 transform backdrop-blur-sm text-[#F2F2F2] w-[450px] border border-[#F2F2F220] shadow-lg shadow-black/70 fixed left-1/2 z-[1000] p-8 rounded-md top-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <div class="flex flex-col items-center justify-center">
        <ph-user-circle-plus :size="48" class="text-blue-500" />
        <h2 class="text-3xl font-semibold">Select your avatar.</h2>
        <span
          class="text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2"
          >Now you can select and see how the avatar will look on your profile.
        </span>
        <div class="grid grid-cols-3 my-8 px-2 gap-x-2 relative w-fit h-fit">
          <ph-arrow-left :size="32" class="absolute -left-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer" />
          <ph-arrow-right :size="32" class="absolute -right-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer" />
          <img
            src="../assets/avatar01.png"
            class="w-24 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 hover:bg-white/5 rounded-md"
          />
          <img
            src="../assets/avatar02.png"
            class="w-24 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 hover:bg-white/5 rounded-md"
          />
          <img
            src="../assets/avatar03.png"
            class="w-24 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 hover:bg-white/5 rounded-md"
          />
        </div>
      </div>
      <div class="flex items-center mx-auto mt-4 gap-x-2 w-fit">
        <button class="bg-blue-500">Select</button>
        <button @click="handleCancel" class="bg-[#252525]">Cancel</button>
      </div>
    </div>
  </portal>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 80px;
  background-clip: padding-box;
  color: #f2f2f2;
  padding: 4px 10px;
  border-radius: 999px;
  transition: all 0.5s ease;
}

button:active {
  transform: scale(1) !important;
  transition: all 100ms ease;
}

button:hover {
  transform: scale(1.1);
}

button svg {
  width: 16px;
}
</style>
