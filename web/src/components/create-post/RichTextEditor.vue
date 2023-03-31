<script setup lang="ts">
import { Header, Editor } from './integrate'
import Btn from '../@globals/Btn.vue'
import { richTextEditorStyles as css } from './styles'
</script>

<template>
  <div :class="css.wrapper">
    <Header />
    <Editor />
    <Btn title="Submit" class="ml-auto" />
  </div>
</template>
