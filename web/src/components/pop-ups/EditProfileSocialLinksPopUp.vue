<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { detectClickOutsideElement, socialNetworks } from '@/utils'
import { Smiley } from '@/components/@globals/atoms/icons'
import { BaseLayoutSlot } from '.'
import { editProfileSocialPopUpStyles as css } from './styles'
import { useAppStore } from '@/store'
import { profileOperations } from '@/store/modules/profile'

const emit = defineEmits(['closedEditProfileSocialLinksPopUp'])

const store = useAppStore()
const showSocialNetworks = ref(false)
const selectedSocialNetwork = ref(socialNetworks[0])
const inputValue = ref('')

onMounted(() => {
  document.addEventListener('click', handleClickOutsideOfNetworksListDropDown)
})
onUnmounted(() => {
  document.removeEventListener(
    'click',
    handleClickOutsideOfNetworksListDropDown
  )
})

function handleClickOutsideOfNetworksListDropDown(event: MouseEvent) {
  const { clickedOutside } = detectClickOutsideElement(event, 'networksList')
  if (clickedOutside && showSocialNetworks.value === true) {
    showSocialNetworks.value = false
  }
}

function handleCancel() {
  emit('closedEditProfileSocialLinksPopUp')
}

async function save() {
  const socialNetwork = selectedSocialNetwork.value.name.toLowerCase()
  const newSocialLink = { [socialNetwork]: inputValue.value }
  await store.dispatch(
    profileOperations.actions.updateSocialLinks,
    newSocialLink
  )
  handleCancel()
}
</script>

<template>
  <portal to="editProfileSocialLinks">
    <BaseLayoutSlot>
      <template #content>
        <Smiley width="48" height="48" :class="css.smileyIcon" />
        <h2 :class="css.title">Social Links</h2>
        <span :class="css.span"
          >Connect with other users and expand your network. Submit empty to
          remove, or same to update.
        </span>
        <div :class="css.inputContainer">
          <div
            id="networksList"
            @click="showSocialNetworks = !showSocialNetworks"
            :class="css.networkListWrapper"
          >
            <img :src="selectedSocialNetwork.url" />
            <ul v-if="showSocialNetworks" :class="css.networkListDropDown">
              <div :class="css.optionsContainer">
                <li
                  v-for="social in socialNetworks"
                  v-show="social.name !== selectedSocialNetwork.name"
                  @click="selectedSocialNetwork = social"
                  :class="css.optionItem"
                >
                  <img :src="social.url" />
                </li>
              </div>
            </ul>
          </div>
          <input
            v-model="inputValue"
            :placeholder="`Insert your ${selectedSocialNetwork.name.toLowerCase()} link`"
            :class="css.input"
          />
        </div>
      </template>
      <template #operations>
        <button @click="save" :class="css.saveBtn">Save</button>
        <button @click="handleCancel" :class="css.cancelBtn">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
