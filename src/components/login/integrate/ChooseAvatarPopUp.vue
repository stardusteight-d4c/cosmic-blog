<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { chooseAvatars } from '@/utils/data'
import { removeScrollBehavior } from '@/utils/remove-scroll-behavior'
import { restoreScrollBehavior } from '@/utils/restore-scroll-behavior'

export default defineComponent({
  name: 'ChooseAvatarPopUp',
  setup(_props, { emit }) {
    const page = ref(1)
    const avatars = chooseAvatars
    const selectedAvatar = ref<null | string>(null)

    removeScrollBehavior()

    const slicedAvatars = computed(() => {
      const itemsPerPage = 3
      const startIndex = (page.value - 1) * itemsPerPage
      const endIndex = page.value * itemsPerPage
      return avatars.slice(startIndex, endIndex)
    })

    function handleCancel() {
      restoreScrollBehavior()
      emit('closedChooseAvatarPopUp')
    }
    function handleSelect() {
      emit('selectedChooseAvatarPopUp', { id: selectedAvatar.value })
      emit('closedChooseAvatarPopUp')
    }

    function handlePage() {
      if (page.value === 1) {
        page.value = 2
      } else {
        page.value = 1
      }
    }

    return {
      page,
      handlePage,
      handleSelect,
      selectedAvatar,
      slicedAvatars,
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
        <div class="grid grid-cols-3 my-8 px-2 gap-x-4 relative w-fit h-fit">
          <ph-arrow-left
            @click="handlePage"
            v-if="page === 2"
            :size="32"
            class="absolute -left-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer"
          />
          <ph-arrow-right
            @click="handlePage"
            v-if="page === 1"
            :size="32"
            class="absolute -right-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer"
          />
          <img
            @click="selectedAvatar = slicedAvatars[0].id"
            :src="slicedAvatars[0].url"
            :class="{
              'scale-110 !bg-[#F2F2F2]/20':
                selectedAvatar === slicedAvatars[0].id,
              'w-24 p-2 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#F2F2F2]/5 rounded-md': true,
            }"
          />
          <img
            @click="selectedAvatar = slicedAvatars[1].id"
            :src="slicedAvatars[1].url"
            :class="{
              'scale-110 !bg-[#F2F2F2]/20':
                selectedAvatar === slicedAvatars[1].id,
              'w-24 p-2 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#F2F2F2]/5 rounded-md': true,
            }"
          />
          <img
            @click="selectedAvatar = slicedAvatars[2].id"
            :src="slicedAvatars[2].url"
            :class="{
              'scale-110 !bg-[#F2F2F2]/20':
                selectedAvatar === slicedAvatars[2].id,
              'w-24 p-2 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#F2F2F2]/5 rounded-md': true,
            }"
          />
        </div>
      </div>
      <div class="flex items-center mx-auto mt-4 gap-x-2 w-fit">
        <button @click="handleSelect" class="bg-blue-500">Select</button>
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
