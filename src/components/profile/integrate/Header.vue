<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import EditProfileSocialLinks from '@/components/pop-ups/EditProfileSocialLinksPopUp.vue'
import memoji from '@/assets/my-memoji02.png'

const route = useRoute()
const username = Array.isArray(route.params.username)
  ? route.params.username[0]
  : route.params.username ?? ''
const editSocialLinks = ref(false)

function closedEditSocialLinksPopUpObserver() {
  editSocialLinks.value = false
}
</script>

<template>
   <div class="w-full mt-8 flex items-center justify-center h-48 relative">
    <div
      class="box-animate w-40 h-40 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto"
    />
    <div
      class="inner-shadow w-[150px] h-[150px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto"
    />
    <div class="absolute w-48 h-48">
      <img
        :src="memoji"
        class="pendulum absolute top-0 pointer-events-none w-48 z-[100] mx-auto"
      />
      <ph-pencil-line
        @click="editSocialLinks = true"
        :size="38"
        class="inner-shadow hover:scale-105 transition-all cursor-pointer absolute bg-[#1a1a1a] text-[#f2f2f2] p-2 rounded-full top-5 right-4 z-[200]"
      />
      <EditProfileSocialLinks
        v-if="editSocialLinks"
        @closedEditProfileSocialLinksPopUp="closedEditSocialLinksPopUpObserver"
      />
    </div>
  </div>
  <h1 class="capitalize font-semibold mx-auto w-fit text-3xl mt-2">
    #{{ username }}'s Profile
  </h1>
</template>
