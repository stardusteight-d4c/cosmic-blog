import type { Module } from 'vuex'
import { AppState } from '@/store'
import api from '@/lib/axios'
import {
  ACTION_GET_USER_DATA,
  ACTION_GET_USER_FAVORITE_POSTS_WITH_PAGINATION,
  ACTION_UPDATE_SOCIAL_LINKS,
} from '@/store/actions'
import {
  MUTATION_SEED_FAVORITED_POSTS,
  MUTATION_SEED_USER_DATA,
} from '@/store/mutations'
import { getSessionCookie } from '@/utils/getSessionCookie'
import { getSinglePropertyValue } from '@/utils/getSinglePropertyValue'
import { removeEmptyValues } from '@/utils/removeObjEmptyValues'
import { ISocialLinks, IUserData } from '@/@interfaces/user'
import { IPostObject } from '@/@interfaces/post'

export interface IUserState {
  userData: IUserData
  favoritedPosts: IPostObject[]
}

export const user: Module<IUserState, AppState> = {
  mutations: {
    [MUTATION_SEED_USER_DATA](state, payload: IUserState) {
      state.userData = { ...state.userData, ...payload }
    },
    [MUTATION_SEED_FAVORITED_POSTS](state, payload: IPostObject[]) {
      state.favoritedPosts = payload
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
    async [ACTION_GET_USER_FAVORITE_POSTS_WITH_PAGINATION](
      { commit },
      payload: { userId: string; skip: number }
    ) {
      const { userId, skip } = payload
      const favoritedPosts = await api
        .get(
          `/post/pagination/byUserFavorites?userId=${userId}&skip=${skip}&pageSize=3`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(MUTATION_SEED_FAVORITED_POSTS, favoritedPosts)
      return favoritedPosts
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
