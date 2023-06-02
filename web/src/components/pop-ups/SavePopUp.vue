<script setup lang="ts">
import { BaseLayoutSlot } from '.'
import { FloppyDisk } from '@/components/@globals/atoms/icons'
import { HTML_ELEMENT_IDS_CREATE_POST_PAGE as ids } from '@/utils'
import { savePopUpStyles as css } from './styles'

const emit = defineEmits(['closedSavePopUp'])

function saveText() {
  const textareaElement: HTMLTextAreaElement = document.getElementById(
    ids.textareaEditor
  ) as HTMLTextAreaElement
  localStorage.setItem('saveText', textareaElement.value)
  emit('closedSavePopUp')
}

function handleCancel() {
  emit('closedSavePopUp')
}
</script>

<template>
  <portal to="savePopUp">
    <BaseLayoutSlot>
      <template #content>
        <FloppyDisk width="48" height="48" :class="css.floppyDiskIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will overwrite if there is already saved content and
          cannot be undone.</span
        >
      </template>
      <template #operations>
        <button @click="saveText" :class="css.BtnSave">Save</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
