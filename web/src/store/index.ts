import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { profile, IProfileState } from './modules/profile'
import { login, ILoginState } from './modules/login'
import { editor, IEditorState } from './modules/editor'
import { auth, IAuthState } from './modules/auth'
import { notification, INotificationState } from './modules/notification'
import { post, IPostState } from './modules/post'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  notification: INotificationState
  login: ILoginState
  auth: IAuthState
  profile: IProfileState
  editor: IEditorState
  post: IPostState
}

export const store = createStore<AppState>({
  modules: { notification, login, auth, profile, editor, post },
})

export function useAppStore(): Store<AppState> {
  return useStore(key)
}
