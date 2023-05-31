import type { Module } from 'vuex'
import type { AppState } from '@/store'


export interface IAuthState {}

export const auth: Module<IAuthState, AppState> = {
  mutations: {},
  actions: {},
}
