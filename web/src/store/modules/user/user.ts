import type { Module } from 'vuex'
import { AppState, key } from '@/store'
import api from '@/lib/axios'
import { ISocialLinks, IUserData } from './@interfaces'
import {
  ACTION_GET_USER_DATA,
  ACTION_UPDATE_SOCIAL_LINKS,
} from '@/store/actions'
import { MUTATION_SEED_USER_DATA } from '@/store/mutations'
import { getSessionCookie } from '@/utils/getSessionCookie'
import { getSinglePropertyValue } from '@/utils/getSinglePropertyValue'
import { removeEmptyValues } from '@/utils/removeObjEmptyValues'

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
      commit(MUTATION_SEED_USER_DATA, {
        ...userData.user,
        favoriteAmount: userData.favoriteAmount,
        commentAmount: userData.commentAmount,
      })
      return userData
    },
    async [ACTION_GET_USER_DATA]({ commit }, payload: { id: string }) {
      const userData = await api
        .get(`/user/search?by=id&value=${payload.id}`)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(MUTATION_SEED_USER_DATA, {
        ...userData.user,
        favoriteAmount: userData.favoriteAmount,
        commentAmount: userData.commentAmount,
      })
      return userData
    },
    async [ACTION_UPDATE_SOCIAL_LINKS]({ commit }, payload: ISocialLinks) {
      let updatedUserData: IUserData
      const userData = this.state.user.userData
      const payloadValue = getSinglePropertyValue(payload)
      updatedUserData = {
        ...userData,
        socialLinks: {
          ...userData.socialLinks,
          ...payload,
        },
      }
      if (payloadValue === '') {
        removeEmptyValues(updatedUserData.socialLinks)
      }
      const authorization = getSessionCookie()
      await api
        .put(`/user/update`, updatedUserData, {
          headers: {
            Authorization: authorization,
          },
        })
        .catch((error) => console.log(error))
      commit(MUTATION_SEED_USER_DATA, updatedUserData)
    },
  },
}
