import type { Module } from 'vuex'
import type { AppState } from '@/store'
import type { IArticleData } from '@interfaces/index'
import { MUTATION_SEED_TEXT_EDITOR_DATA } from '@store/mutations'
import { toRaw } from 'vue'

export interface IArticleState {
  textEditorData: IArticleData | null
}

export const article: Module<IArticleState, AppState> = {
  mutations: {
    [MUTATION_SEED_TEXT_EDITOR_DATA](state, payload: IArticleData) {
      state.textEditorData = payload
      console.log('state.textEditorData', state.textEditorData)
    },
  },
  actions: {},
}
