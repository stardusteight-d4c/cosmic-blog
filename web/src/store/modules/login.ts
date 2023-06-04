import type { Module } from 'vuex'
import type { AppState } from '@/store'
import api from '@/lib/axios'
import { IRegisterUserData, ISignUpData } from '@/@interfaces/login'

export interface ILoginState {
  signUpData: ISignUpData
}

export const loginMethods = {
  mutations: {
    SIGN_UP_DATA: 'MUTATION_SIGN_UP_DATA',
  },
  actions: {
    EMAIL_VERIFY: 'ACTION_EMAIL_VERIFY',
    REGISTER_USER: 'ACTION_REGISTER_USER',
  },
}
const M = loginMethods.mutations
const A = loginMethods.actions

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
    [M.SIGN_UP_DATA](state, payload: ISignUpData) {
      state.signUpData = payload
    },
  },
  actions: {
    async [A.EMAIL_VERIFY](_, email: string): Promise<string> {
      const encryptedCode = await api
        .post(`/user/verifyEmail/${email}`)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      return encryptedCode
    },
    async [A.REGISTER_USER](_, payload: IRegisterUserData) {
      const data = await api
        .post(`/user/register`, payload)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      return data
    },
  },
}
