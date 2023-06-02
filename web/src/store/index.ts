import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { article, login, user } from './modules'
import { MUTATION_NOTIFY } from './mutations'
import type { INotification } from '@interfaces/notification'
import { IUserState } from './modules/user/user'
import { ILoginState } from './modules/login/login'
import { IArticleState } from './modules/article/article'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  login: ILoginState
  user: IUserState
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
        selectedAvatar: '',
      },
    },
    user: {
      userData: {
        id: '',
        email: '',
        username: '',
        password: '',
        avatar: '',
        userRole: 'reader',
        socialLinks: {},
        favoriteAmount: 0,
        commentAmount: 0,
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
  modules: { article, login, user },
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
