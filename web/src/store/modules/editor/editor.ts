import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { IArticleData } from '@/@interfaces/article'
import { MUTATION_SHOW_PREVIEW, MUTATION_TEXT_EDITOR_DATA } from './mutations'

export interface IEditorState {
  textEditorData: IArticleData
  showPreview: boolean
}

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
    [MUTATION_TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = { ...state.textEditorData, ...payload }
    },
    [MUTATION_SHOW_PREVIEW](state, payload: boolean) {
      state.showPreview = payload
    },
  },
  actions: {},
}
