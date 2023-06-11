<script setup lang="ts">
import { Header, Editor, EditModeButtons } from "./integrate";
import Btn from "../@globals/Btn.vue";
import { richTextEditorStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { computed } from "vue";
import { RichTextEditorFunctions } from "@/functions/EditorFunctions";

const store = useAppStore();
const editMode = computed(() => store.state.editor.editMode);
const session = computed(() => store.state.auth.session);
const editorData = computed(() => store.state.editor.richTextEditor);

const functions = new RichTextEditorFunctions({
  editorData,
  session: session.value,
});
</script>

<template>
  <div :class="css.wrapper">
    <Header />
    <Editor />
    <EditModeButtons />
    <Btn
      v-if="!editMode"
      @click="functions.submitPost()"
      title="Submit"
      :class="css.button"
    />
  </div>
</template>
