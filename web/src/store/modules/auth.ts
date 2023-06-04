import type { Module } from 'vuex'
import type { AppState } from '@/store'
import { getSessionCookie } from '@/utils/getSessionCookie'
import jwt_decode from 'jwt-decode'
import { TUserRole } from '@/@interfaces/login'

type decodedToken = {
  user_id: string
  email: string
  type: TUserRole
}

export interface IAuthState {
  session: {
    activeSession: boolean
    token: string | undefined
    decodedToken: decodedToken | undefined
  }
}

export const authMethods = {
  mutations: {
    CURRENT_SESSION: ' MUTATION_CURRENT_SESSION',
  },
  actions: {},
}
const M = authMethods.mutations

export const auth: Module<IAuthState, AppState> = {
  state: {
    session: {
      activeSession: false,
      token: undefined,
      decodedToken: undefined,
    },
  },
  mutations: {
    [M.CURRENT_SESSION](state) {
      const sessionCookie = getSessionCookie()
      if (!sessionCookie) {
        state.session = {
          activeSession: false,
          token: undefined,
          decodedToken: undefined,
        }
      } else {
        try {
          const decodedToken: decodedToken = jwt_decode(sessionCookie)
          if (decodedToken?.user_id) {
            state.session = {
              activeSession: true,
              token: sessionCookie,
              decodedToken: decodedToken,
            }
          }
        } catch (error) {
          state.session = {
            activeSession: false,
            token: undefined,
            decodedToken: undefined,
          }
        }
      }
    },
  },
  actions: {},
}
