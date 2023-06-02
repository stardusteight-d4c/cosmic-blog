import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { ACTION_EMAIL_VERIFY, ACTION_REGISTER_USER } from '@/store/actions'
import api from '@/lib/axios'
import { MUTATION_SIGN_UP_DATA } from '@/store/mutations'
import { IRegisterUserData, ISignUpData } from '@/@interfaces/login'

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
    async [ACTION_REGISTER_USER](_, payload: IRegisterUserData) {
      const data = await api
        .post(`/user/register`, payload)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      return data
    },
  },
}
