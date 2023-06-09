import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { IRegisterUserData, ISignUpData } from '@/@interfaces/login'
import { GET, POST } from '@/http'

export interface ILoginState {
  signUp: ISignUpData
}

export const loginMethods = {
  mutations: {
    setSignUp: 'SET_SIGN_UP',
  },
  actions: {
    verifyEmail: 'VERIFY_EMAIL',
    registerUser: 'REGISTER_USER',
    sign: 'SIGNIN',
  },
}

const mutations = loginMethods.mutations
const actions = loginMethods.actions

export const login: Module<ILoginState, AppState> = {
  state: {
    signUp: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      selectedAvatar: '',
    },
  },
  mutations: {
    [mutations.setSignUp](state, payload: ISignUpData) {
      state.signUp = payload
    },
  },
  actions: {
    async [actions.verifyEmail](_, email: string): Promise<string> {
      return await POST.verifyEmail(email)
    },

    async [actions.registerUser](_, payload: IRegisterUserData) {
      return await POST.registerUser(payload)
    },

    async [actions.sign](_, payload: { identifier: string; password: string }) {
      return await GET.sign(payload)
    }
  },
}
