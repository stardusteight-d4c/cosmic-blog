<script setup lang="ts">
import { BaseLayoutSlot } from ".";
import { Download } from "@/components/@globals/atoms/icons";
import { importSavePopUpStyles as css } from "./styles";
import useNotificator from "@/hooks/Notificator";

const emit = defineEmits(["closedImportSavePopUp"]);
const { notify } = useNotificator();

function getSave(): void {
  const savedText = localStorage.getItem("saveText");
  if (!savedText) {
    notify("ERROR", "No save found.");
    emit("closedImportSavePopUp");
    return;
  }
  const textareaElement: HTMLTextAreaElement = document.getElementById(
    "textareaEditor"
  ) as HTMLTextAreaElement;
  textareaElement.value = savedText;
  emit("closedImportSavePopUp");
}

function handleCancel(): void {
  emit("closedImportSavePopUp");
}
</script>

<template>
  <portal to="importSavePopUp">
    <BaseLayoutSlot>
      <template #content>
        <Download width="48" height="48" :class="css.downloadIcon" />
        <h2 :class="css.title">Are you sure?</h2>
        <span :class="css.span"
          >This action will import the saved text, your current progress will be
          lost. Do you wish to continue?
        </span>
      </template>
      <template #operations>
        <button @click="getSave" :class="css.BtnSave">Import</button>
        <button @click="handleCancel" :class="css.btnCancel">Cancel</button>
      </template>
    </BaseLayoutSlot>
  </portal>
</template>
