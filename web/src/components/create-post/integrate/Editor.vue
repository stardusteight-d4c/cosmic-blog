<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Controls } from ".";
import { editorStyles as css } from "./styles";
import { useAppStore } from "@/store";
import { EditorFunctions } from "@/functions/EditorFunctions";

const store = useAppStore();
const textarea = ref<HTMLTextAreaElement>();
const editorData = computed(() => store.state.editor.richTextEditor);

onMounted((): void => {
  textarea.value = document.getElementById(
    "textareaEditor"
  )! as HTMLTextAreaElement;
});

const functions = new EditorFunctions({ textarea });
</script>

<template>
  <div :class="css.wrapper">
    <div :class="css.controlsContainer">
      <Controls />
    </div>
    <div :class="css.textareaContainer">
      <textarea
        id="textareaEditor"
        v-model="editorData.body"
        :spellcheck="false"
        @keydown.tab.prevent="functions.insertTab"
        :class="css.textarea"
      />
    </div>
  </div>
</template>
