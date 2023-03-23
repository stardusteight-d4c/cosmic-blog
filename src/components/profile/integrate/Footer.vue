<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import EditProfileSocialLinks from '@/components/pop-ups/EditProfileSocialLinksPopUp.vue'
import { socialNetworks } from '@/utils/data'
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
  <div class="flex flex-col items-center justify-center">
    <div
      class="flex items-center justify-center flex-wrap gap-x-4 w-[300px] mt-4"
    >
      <a
        v-for="social in socialNetworks"
        href=""
        target="_blank"
        class="flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70"
        ><img :src="social.url" width="20" />{{ social.name }}</a
      >
    </div>
  </div>
</template>

