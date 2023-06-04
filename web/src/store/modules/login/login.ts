import type { Module } from 'vuex'
import type { AppState } from '@/store'
import api from '@/lib/axios'
import { IRegisterUserData, ISignUpData } from '@/@interfaces/login'
import { MUTATION_SIGN_UP_DATA } from './mutations'
import { ACTION_EMAIL_VERIFY, ACTION_REGISTER_USER } from './actions'

export interface ILoginState {
  signUpData: ISignUpData
}

export const login: Module<ILoginState, AppState> = {
  state: {
    signUpData: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      selectedAvatar: '',
    },
  },
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
