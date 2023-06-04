import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { IArticleData } from '@/@interfaces/article'
import api from '@/lib/axios'
import { IPostObject } from '@/@interfaces/post'
import { getSessionCookie } from '@/utils/getSessionCookie'

export interface IEditorState {
  textEditorData: IArticleData
  showPreview: boolean
}

export const editorMethods = {
  mutations: {
    TEXT_EDITOR_DATA: 'MUTATION_TEXT_EDITOR_DATA',
    SHOW_PREVIEW: 'MUTATION_SHOW_PREVIEW',
  },
  actions: {
    PUBLISH_POST: 'ACTION_PUBLISH_POST',
  },
}
const M = editorMethods.mutations
const A = editorMethods.actions

export const editor: Module<IEditorState, AppState> = {
  state: {
    textEditorData: {
      tags: [],
      coverImage: '',
      title: '',
      date: new Date(),
      body: '',
    },
    showPreview: false,
  },
  mutations: {
    [M.TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = { ...state.textEditorData, ...payload }
    },
    [M.SHOW_PREVIEW](state, payload: boolean) {
      state.showPreview = payload
    },
  },
  actions: {
    async [A.PUBLISH_POST](_, post: IPostObject) {
      const authorization = getSessionCookie()
      await api
        .post(`/post`, post, {
          headers: {
            Authorization: authorization,
          },
        })
        .then((res) => res.data)
        .catch((error) => console.log(error))
    },
  },
}
