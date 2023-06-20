<script setup lang="ts">
import Btn from "@globals/Btn.vue";
import { useAppStore } from "@/store";
import { computed, ref } from "vue";
import { DeletePostPopUp } from "@/components/pop-ups";
import { editModeButtonsStyles as css } from "./styles";
import { EditModeButtonsFunctions } from "@/functions/EditorFunctions";

const store = useAppStore();
const editMode = computed(() => store.state.editor.editMode);
const session = computed(() => store.state.auth.session);
const editorData = computed(() => store.state.editor.richTextEditor);
const proceedToDelete = ref(false);

function onClosedDeletePopUp(): void {
  proceedToDelete.value = false;
}

const functions = new EditModeButtonsFunctions({
  editorData,
  session: session.value,
});
</script>

<template>
  <DeletePostPopUp
    v-if="proceedToDelete"
    :postId="editorData.postId!"
    @closedDeletePopUp="onClosedDeletePopUp"
  />
  <div v-if="editMode" :class="css.wrapper">
    <button @click="functions.handleCancelEdit" :class="css.cancelBtn">
      Cancel
    </button>
    <button @click="proceedToDelete = true" :class="css.deleteBtn">
      Delete
    </button>
    <Btn
      @click="functions.updatePost()"
      title="Update"
      :class="css.updateBtn"
    />
  </div>
</template>
