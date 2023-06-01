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
    async [ACTION_EMAIL_VERIFY](_, email: string): Promise<string> {
      const encryptedCode = await api
        .post(`/user/verifyEmail/${email}`)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      return encryptedCode
    },
  },
}
