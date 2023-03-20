<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { socialNetworks } from '@/utils/data'
import { removeScrollBehavior } from '@/utils/remove-scroll-behavior'
import { restoreScrollBehavior } from '@/utils/restore-scroll-behavior'

// fazer a validação se de fato é um link de perfil da rede social
export default defineComponent({
  name: 'EditProfileSocialLinksPopUp',
  setup(_props, { emit }) {
    const showSocialNetworks = ref(false)
    const selectedSocialNetwork = ref(socialNetworks[0])

    removeScrollBehavior()

    function handleCancel() {
      restoreScrollBehavior()
      emit('closedEditProfileSocialLinksPopUp')
    }

    return {
      handleCancel,
      socialNetworks,
      selectedSocialNetwork,
      showSocialNetworks,
    }
  },
})
</script>

<template>
  <portal to="editProfileSocialLinks">
    <div class="inset-0 bg-black/40 z-[950] fixed" />
    <div
      class="bg-[#1a1a1a]/50 transform backdrop-blur-sm text-[#F2F2F2] w-[450px] border border-[#F2F2F220] shadow-lg shadow-black/70 fixed left-1/2 z-[1000] p-8 rounded-md top-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <div class="flex flex-col items-center justify-center">
        <ph-smiley :size="48" class="text-blue-500" />

        <h2 class="text-3xl font-semibold">Social Links</h2>
        <span
          class="text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2"
          >Connect with other users and expand your network. Submit empty to
          remove, or same to update.
        </span>
        <div class="flex items-center gap-x-2 mt-4">
          <div
            @click="showSocialNetworks = !showSocialNetworks"
            class="bg-[#1A1A1A] relative p-1 rounded-md cursor-pointer border border-[#F2F2F220]"
          >
            <img :src="selectedSocialNetwork.url" class="" />
            <ul
              v-if="showSocialNetworks"
              class="absolute -right-[1.8px] mt-2 bg-[#1A1A1A] w-[34px] overflow-hidden rounded-md border border-[#F2F2F220] shadow-md shadow-black/70"
            >
              <div class="max-h-[100px] scrollbar-hide overflow-y-scroll">
                <li
                  v-for="social in socialNetworks"
                  v-show="social.name !== selectedSocialNetwork.name"
                  @click="selectedSocialNetwork = social"
                  class="flex items-center p-1 gap-x-1 transition-all hover:bg-black/50 cursor-pointer"
                >
                  <img :src="social.url" />
                </li>
              </div>
            </ul>
          </div>
          <input
            :placeholder="`Insert your ${selectedSocialNetwork.name.toLowerCase()} link`"
            class="py-1 px-2 outline-none rounded-md bg-[#1A1A1A] border border-[#F2F2F220]"
          />
        </div>
      </div>
      <div class="flex items-center mx-auto mt-4 gap-x-2 w-fit">
        <button class="bg-blue-500">Save</button>
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
