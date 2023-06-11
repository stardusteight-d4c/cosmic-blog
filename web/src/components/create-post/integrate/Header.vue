<script setup lang="ts">
import { ref, computed } from "vue";
import { useAppStore } from "@store/index";
import { headerStyles as css } from "./styles";
import { IPostResponse } from "@/@interfaces/post";
import { HeaderFunctions } from "@/functions/EditorFunctions";

const store = useAppStore();
const editMode = computed(() => store.state.editor.editMode);
const editorData = computed(() => store.state.editor.richTextEditor);
const term = ref("");
const tag = ref<string>("");
const posts = ref<IPostResponse[]>([]);
const fileUploaded = ref<FileList | null>(null);
const fileUploadedOnEditMode = ref<FileList | null>(null);

const functions = new HeaderFunctions({
  editMode,
  editorData,
  fileUploaded,
  fileUploadedOnEditMode,
  posts,
  tag,
  term,
});
</script>

<template>
  <div :class="css.searchWrapper">
    <input
      @input="functions.search"
      type="text"
      v-model="term"
      :placeholder="`Search for a post`"
      :class="css.searchInput"
    />
    <ul :class="css.handleDropdown(posts)">
      <li
        v-for="post in posts"
        :class="css.dropdownItem"
        @click="functions.handleSelectedToEdit(post)"
      >
        {{ post.title }}
      </li>
    </ul>
  </div>
  <div :class="css.wrapper">
    <div>
      <button
        v-on:click="functions.onClickUpload"
        :class="css.handleUploadBtn(fileUploaded)"
      >
        <span v-if="fileUploaded" :class="css.uploadedSpan"
          >Uploaded Image</span
        >
        <span v-else :class="css.uploadedSpan">Add a cover image</span>
      </button>
    </div>
    <span v-if="fileUploaded && !editMode" :class="css.fileName">{{
      fileUploaded[0].name
    }}</span>
    <span v-if="editMode" :class="css.fileName">{{
      (fileUploaded && fileUploaded[0].name) ?? editorData.coverImage
    }}</span>
  </div>
  <input
    type="file"
    class="hidden"
    id="inputFile"
    accept="image/png, image/jpeg"
    @change="functions.onFileChange($event)"
  />
  <div :class="css.titleContainer">
    <input
      type="text"
      v-model="editorData.title"
      placeholder="New post title here..."
      :class="css.titleInput"
    />
  </div>
  <div :class="css.tagsContainer">
    <span v-for="(tag, index) in editorData.tags" :key="index" :class="css.tag"
      >#{{ tag }}</span
    >
    <input
      type="text"
      placeholder="Add up to 4 tags..."
      v-model="tag"
      :class="css.tagInput"
      @keydown.enter="functions.handleTags"
      @keydown="functions.onKeyDownInTagInput($event)"
    />
  </div>
</template>
