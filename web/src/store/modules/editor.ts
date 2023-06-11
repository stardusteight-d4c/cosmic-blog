import type { Module } from "vuex";
import type { AppState } from "@/store";
import { IArticleData } from "@/@interfaces/article";
import { IPostResponse } from "@/@interfaces/post";
import { POST, PUT } from "@/http";
import { DELETE } from "@/http/DELETE";

export interface IEditorState {
  richTextEditor: IArticleData;
  showPreview: boolean;
  editMode: boolean;
}

export const editorMethods = {
  mutations: {
    setRichTextEditor: "SET_RICH_TEXT_EDITOR",
    setShowPreview: "SET_SHOW_PREVIEW",
    setEditMode: "SET_EDIT_MODE",
  },
  actions: {
    publishPost: "PUBLISH_POST",
    updatePost: "UPDATE_POST",
    deletePost: "DELETE_POST",
  },
};

const mutations = editorMethods.mutations;
const actions = editorMethods.actions;

export const editor: Module<IEditorState, AppState> = {
  state: {
    richTextEditor: {
      postId: undefined,
      tags: [],
      coverImage: "",
      title: "",
      date: new Date(),
      body: "",
    },
    showPreview: false,
    editMode: false,
  },
  mutations: {
    [mutations.setRichTextEditor](state, payload: IArticleData) {
      state.richTextEditor = { ...state.richTextEditor, ...payload };
    },

    [mutations.setShowPreview](state, payload: boolean) {
      state.showPreview = payload;
    },

    [mutations.setEditMode](state, payload: boolean) {
      state.editMode = payload;
    },
  },
  actions: {
    async [actions.publishPost](_, post: IPostResponse) {
      await POST.publishPost(post);
    },

    async [actions.updatePost](_, updatedPost: IPostResponse) {
      await PUT.updatePost(updatedPost);
    },

    async [actions.deletePost](_, postId: string) {
      await DELETE.deletePost(postId);
    },
  },
};
