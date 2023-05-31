import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { article, login, ILoginState } from './modules'
import type { IArticleState } from './modules'
import { MUTATION_NOTIFY } from './mutations'
import type { INotification } from '@interfaces/notification'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  login: ILoginState
  article: IArticleState
  notifications: INotification[]
}

export const store = createStore<AppState>({
  state: {
    login: {
      signUpData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    },
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
  modules: { article, login },
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
        }, 4000)
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
