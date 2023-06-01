import type { Module } from 'vuex'
import type { AppState } from '@/store'
import api from '@/lib/axios'
import { ISocialLinks, IUserData, IUserReflectObject } from './@interfaces'
import {
  ACTION_GET_USER_DATA,
  ACTION_UPDATE_SOCIAL_LINKS,
} from '@/store/actions'
import { MUTATION_SEED_USER_DATA } from '@/store/mutations'

export interface IUserState {
  userData: IUserData
}

export const user: Module<IUserState, AppState> = {
  mutations: {
    [MUTATION_SEED_USER_DATA](state, payload: IUserState) {
      state.userData = { ...state.userData, ...payload }
    },
  },
  actions: {
    async [ACTION_GET_USER_DATA]({ commit }, payload: { id: string }) {
      const userData = await api
        .get(`/user/search?by=id&value=${payload.id}`)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(MUTATION_SEED_USER_DATA, userData.user)
      return userData
    },
    async [ACTION_UPDATE_SOCIAL_LINKS]({ commit }, payload: ISocialLinks) {
      const userData = this.state.user.userData
      const updatedUserData = {
        ...userData,
        socialLinks: {
          ...userData.socialLinks,
          ...payload,
        },
      }
      await api
        .put(`/user/update`, updatedUserData)
        .catch((error) => console.log(error))
      commit(MUTATION_SEED_USER_DATA, updatedUserData)
    },
  },
}
