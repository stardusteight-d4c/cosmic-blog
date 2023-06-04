import type { Module } from 'vuex'
import type { AppState } from '@/store'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'
import { IArticleData } from '@/@interfaces/article'

export interface IArticleState {
  textEditorData: IArticleData
  showPreview: boolean
}

export const article: Module<IArticleState, AppState> = {
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
    [MUTATION_SEED_TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = { ...state.textEditorData, ...payload }
    },
    [MUTATION_EVENT_SHOW_PREVIEW](state, payload: boolean) {
      state.showPreview = payload
    },
  },
  actions: {},
}
