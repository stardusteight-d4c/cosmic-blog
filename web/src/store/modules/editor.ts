import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { IArticleData } from '@/@interfaces/article'
import api from '@/lib/axios'
import { getSessionCookie } from '@/utils/getSessionCookie'
import { IPostResponse } from '@/@interfaces/post'

export interface IEditorState {
  textEditorData: IArticleData
  showPreview: boolean
  editMode: boolean
}

export const editorMethods = {
  mutations: {
    TEXT_EDITOR_DATA: 'MUTATION_TEXT_EDITOR_DATA',
    SHOW_PREVIEW: 'MUTATION_SHOW_PREVIEW',
    SET_EDIT_MODE: 'SET_EDIT_MODE',
  },
  actions: {
    PUBLISH_POST: 'ACTION_PUBLISH_POST',
    UPDATE_POST: 'ACTION_UPDATE_POST',
    DELETE_POST: 'ACTION_DELETE_POST',
  },
}
const M = editorMethods.mutations
const A = editorMethods.actions

export const editor: Module<IEditorState, AppState> = {
  state: {
    textEditorData: {
      postId: undefined,
      tags: [],
      coverImage: '',
      title: '',
      date: new Date(),
      body: '',
    },
    showPreview: false,
    editMode: false,
  },
  mutations: {
    [M.TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = { ...state.textEditorData, ...payload }
    },
    [M.SHOW_PREVIEW](state, payload: boolean) {
      state.showPreview = payload
    },
    [M.SET_EDIT_MODE](state, payload: boolean) {
      state.editMode = payload
    },
  },
  actions: {
    async [A.PUBLISH_POST](_, post: IPostResponse) {
      const authorization = getSessionCookie()
      await api
        .post('/post', post, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error))
    },
    async [A.UPDATE_POST](_, post: IPostResponse) {
      const authorization = getSessionCookie()
      await api
        .put('/post', post, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error))
    },
    async [A.DELETE_POST](_, postId: string) {
      const authorization = getSessionCookie()
      await api
        .delete(`/post/${postId}`, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error))
    },
  },
}
