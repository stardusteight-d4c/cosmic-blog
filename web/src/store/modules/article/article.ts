import type { Module } from 'vuex'
import type { AppState } from '@/store'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'
import { IArticleData } from './@interfaces'

export interface IArticleState {
  textEditorData: IArticleData
  showPreview: boolean
}

export const article: Module<IArticleState, AppState> = {
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
