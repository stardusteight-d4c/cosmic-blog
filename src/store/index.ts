import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { article } from './modules'
import type { IArticleState } from './modules'
import { MUTATION_NOTIFY } from './mutations'
import type { INotification } from '@interfaces/notification'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  article: IArticleState
  notifications: INotification[]
}

export const store = createStore<AppState>({
  state: {
    article: {
      textEditorData: {
        tags: [],
        coverImage: '',
        title: '',
        date: new Date(),
        body: '',
      },
      showPreview: false,
    },
    notifications: [],
  },
  modules: { article },
  mutations: {
    [MUTATION_NOTIFY](state, newNotification: INotification) {
      const indexResult = state.notifications.findIndex(
        (notification) => notification.content === newNotification.content
      )
      const notificationDoesNotExistYet = indexResult < 0
      function removeNotificationAfterAWhile() {
        setTimeout(() => {
          state.notifications = state.notifications.filter(
            (notification) => notification.id !== newNotification.id
          )
        }, 5000)
      }

      if (notificationDoesNotExistYet) {
        newNotification.id = new Date().getTime()
        state.notifications.push(newNotification)
        removeNotificationAfterAWhile()
      }
    },
  },
})

export function useAppStore(): Store<AppState> {
  return useStore(key)
}
