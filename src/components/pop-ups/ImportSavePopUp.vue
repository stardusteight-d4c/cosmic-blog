<script setup lang="ts">
import { BaseLayoutSlot } from '.'
import { FloppyDisk } from '@globals/atoms/icons'
import { importSavePopUpStyles as css } from './styles'
// import {}
const emit = defineEmits(['closedImportSavePopUp'])

function getSave() {
  const savedText = localStorage.getItem('saveText')
  if (!savedText) {
    return
  }
  // textarea.value!.value = savedText
}
function handleCancel() {
  emit('closedImportSavePopUp')
}
</script>

<template>
  <portal to="importSavePopUp">
    <BaseLayoutSlot>
      <template #content>
        <FloppyDisk width="48" height="48" :class="css.floppyDiskIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will import the saved text, your current progress will be
          lost. Do you wish to continue?
        </span>
      </template>
      <template #operations>
        <button @click="getSave" :class="css.BtnSave">Import Save</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
