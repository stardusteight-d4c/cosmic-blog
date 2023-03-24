import type { Module } from 'vuex'
import type { AppState } from '@/store'
import type { IArticleData } from '@interfaces/index'
import {
  MUTATION_SEED_TEXT_EDITOR_DATA,
  MUTATION_EVENT_SHOW_PREVIEW,
} from '@store/mutations'

export interface IArticleState {
  textEditorData: IArticleData
  showPreview: boolean
}

export const article: Module<IArticleState, AppState> = {
  mutations: {
    [MUTATION_SEED_TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = { ...state.textEditorData, ...payload }
      console.log('state.textEditorData', state.textEditorData)
    },
    [MUTATION_EVENT_SHOW_PREVIEW](state, payload: boolean) {
      state.showPreview = payload
      console.log('state.showPreview', state.showPreview)
    },
  },
  actions: {},
}
