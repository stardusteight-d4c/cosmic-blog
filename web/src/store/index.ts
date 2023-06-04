import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'
import { profile, IProfileState } from './modules/profile/profile'
import { login, ILoginState } from './modules/login/login'
import { editor, IEditorState } from './modules/editor/editor'
import {
  notification,
  INotificationState,
} from './modules/notification/notification'

export const key: InjectionKey<Store<AppState>> = Symbol()

export interface AppState {
  notification: INotificationState
  login: ILoginState
  profile: IProfileState
  editor: IEditorState
}

export const store = createStore<AppState>({
  modules: { notification, login, profile, editor },
})

export function useAppStore(): Store<AppState> {
  return useStore(key)
}
