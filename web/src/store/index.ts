import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { notification, article, login, user } from './modules'
import { IUserState } from './modules/user/user'
import { ILoginState } from './modules/login/login'
import { IArticleState } from './modules/article/article'
import { INotificationState } from './modules/notification/notification'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  notification: INotificationState
  login: ILoginState
  user: IUserState
  article: IArticleState
}

export const store = createStore<AppState>({
  modules: { notification, login, user, article },
})

export function useAppStore(): Store<AppState> {
  return useStore(key)
}
