<script setup lang="ts">
import { Header, Editor } from "./integrate";
import Btn from "../@globals/Btn.vue";
import { richTextEditorStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { computed } from "vue";
import EditModeButtons from "./integrate/EditModeButtons.vue";
import { Functions } from "./functions/Functions";

const store = useAppStore();
const editMode = computed(() => store.state.editor.editMode);
const session = computed(() => store.state.auth.session);
const editorData = computed(() => store.state.editor.richTextEditor);
</script>

<template>
  <div :class="css.wrapper">
    <Header />
    <Editor />
    <EditModeButtons />
    <Btn
      v-if="!editMode"
      @click="Functions.submitPost({ editorData, session, store })"
      title="Submit"
      :class="css.button"
    />
  </div>
</template>
