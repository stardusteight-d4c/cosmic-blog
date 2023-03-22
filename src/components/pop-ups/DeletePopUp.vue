<script setup lang="ts">
import { XCircle } from '@globals/atoms/icons'
import { BaseLayoutSlot } from '.'
import { deletePopUpStyles as css } from './styles'

const emit = defineEmits(['closedDeletePopUp'])

function handleCancel() {
  emit('closedDeletePopUp')
}
</script>

<template>
  <portal to="deletePopUp">
    <BaseLayoutSlot>
      <template #content>
        <XCircle width="48" height="48" :class="css.XCircleIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will delete your comment and cannot be undone.</span
        >
      </template>
      <template #operations>
        <button :class="css.BtnDelete">Delete</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
