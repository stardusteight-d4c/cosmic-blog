<script setup lang="ts">
import { ref, computed } from 'vue'
import { chooseAvatars } from '@/utils'
import { UserCirclePlus, Arrow } from '@/components/@globals/atoms/icons'
import { BaseLayoutSlot } from '.'
import { chooseAvatarPopUpStyles as css } from './styles'

const emit = defineEmits([
  'closedChooseAvatarPopUp',
  'selectedChooseAvatarPopUp',
])

const page = ref(1)
const avatars = chooseAvatars
const selectedAvatar = ref<null | string>(null)
const slicedAvatars = computed(() => {
  const itemsPerPage = 3
  const startIndex = (page.value - 1) * itemsPerPage
  const endIndex = page.value * itemsPerPage
  return avatars.slice(startIndex, endIndex)
})

function handleCancel() {
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
</script>

<template>
  <portal to="chooseAvatarPopUp">
    <BaseLayoutSlot>
      <template #content>
        <UserCirclePlus
          width="48"
          height="48"
          :class="css.userCirclePlusIcon"
        />
        <h2 :class="css.title">Select your avatar</h2>
        <span :class="css.span"
          >Now you can select and see how the avatar will look on your profile.
        </span>
        <div :class="css.avatarSelectionContainer">
          <Arrow
            @click="handlePage"
            v-if="page === 2"
            width="32"
            height="32"
            :class="css.arrowLeft"
          />
          <Arrow
            @click="handlePage"
            v-if="page === 1"
            width="32"
            height="32"
            :class="css.arrowRight"
          />
          <img
            v-for="(_avatar, index) in slicedAvatars"
            @click="selectedAvatar = slicedAvatars[index].id"
            :src="slicedAvatars[index].url"
            :class="
              css.handleAvatarsImage(slicedAvatars, selectedAvatar, index)
            "
          />
        </div>
      </template>
      <template #operations>
        <button @click="handleSelect" :class="css.salectBtn">Select</button>
        <button @click="handleCancel" :class="css.cancelBtn">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
