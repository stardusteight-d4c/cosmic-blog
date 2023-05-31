import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { ACTION_EMAIL_VERIFY } from '@/store/actions'
import api from '@/lib/axios'
import { ISignUpData } from './@interfaces'
import { MUTATION_SIGN_UP_DATA } from '@/store/mutations'

export interface ILoginState {
  signUpData: ISignUpData
}

export const login: Module<ILoginState, AppState> = {
  mutations: {
    [MUTATION_SIGN_UP_DATA](state, payload: ISignUpData) {
      state.signUpData = payload
    },
  },
  actions: {
    async [ACTION_EMAIL_VERIFY](_, email: string) {
      console.log('email', email)

      //  await api
      //   .post('/auth/verifyEmail', {
      //     email,
      //   })
      //   .catch((error) => console.log(error))
    },
  },
}
