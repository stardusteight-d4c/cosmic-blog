<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { socialNetworks } from '@/utils/data'
import { detectClickOutsideElement } from '@/utils/detect-click-outside-element'
import { Smiley } from '@globals/atoms/icons'
import { BaseLayoutSlot } from '.'
import { editProfileSocialPopUpStyles as css } from './styles'

// fazer a validação se de fato é um link de perfil da rede social

const emit = defineEmits(['closedEditProfileSocialLinksPopUp'])

const showSocialNetworks = ref(false)
const selectedSocialNetwork = ref(socialNetworks[0])

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
            :placeholder="`Insert your ${selectedSocialNetwork.name.toLowerCase()} link`"
            :class="css.input"
          />
        </div>
      </template>
      <template #operations>
        <button :class="css.saveBtn">Save</button>
        <button @click="handleCancel" :class="css.cancelBtn">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
