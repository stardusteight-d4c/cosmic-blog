import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { article } from './modules'
import type { IArticleState } from './modules'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  article: IArticleState
}

export const store = createStore<AppState>({
  state: {
    article: {
      textEditorData: null,
    },
  },
  modules: { article },
})

export function useAppStore(): Store<AppState> {
  return useStore(key)
}
