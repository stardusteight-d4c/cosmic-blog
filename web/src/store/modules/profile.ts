import type { Module } from 'vuex'
import { AppState } from '@/store'
import api from '@/lib/axios'
import { getSessionCookie } from '@/utils/getSessionCookie'
import { getSinglePropertyValue } from '@/utils/getSinglePropertyValue'
import { removeEmptyValues } from '@/utils/removeObjEmptyValues'
import { ISocialLinks, IProfileData } from '@/@interfaces/user'
import { IPostObject } from '@/@interfaces/post'
import { ICommentResponse } from '@/@interfaces/comment'

export interface IProfileState {
  userData: IProfileData
  favoritedPosts: IPostObject[]
  commentedPosts: ICommentResponse[]
}

export const profileMethods = {
  mutations: {
    PROFILE_DATA: 'MUTATION_PROFILE_DATA',
    PROFILE_FAVORITED_POSTS: 'MUTATION_PROFILE_FAVORITED_POSTS',
    PROFILE_COMMENTED_POSTS: 'MUTATION_PROFILE_COMMENTED_POSTS',
  },
  actions: {
    GET_PROFILE_DATA: 'ACTION_GET_PROFILE_DATA',
    GET_PROFILE_FAVORITED_POSTS: 'ACTION_GET_PROFILE_FAVORITED_POSTS',
    GET_PROFILE_COMMENTED_POSTS: 'ACTION_GET_PROFILE_COMMENTED_POSTS',
    UPDATE_PROFILE_SOCIAL_LINKS: 'ACTION_UPDATE_PROFILE_SOCIAL_LINKS',
  },
}
const M = profileMethods.mutations
const A = profileMethods.actions

export const profile: Module<IProfileState, AppState> = {
  state: {
    userData: {
      id: '',
      email: '',
      username: '',
      password: '',
      avatar: '',
      userRole: 'reader',
      socialLinks: {},
      favoriteAmount: 0,
      commentAmount: 0,
    },
    favoritedPosts: [],
    commentedPosts: [],
  },
  mutations: {
    [M.PROFILE_DATA](state, payload: IProfileState) {
      state.userData = { ...state.userData, ...payload }
    },
    [M.PROFILE_FAVORITED_POSTS](state, payload: IPostObject[]) {
      state.favoritedPosts = payload
    },
    [M.PROFILE_COMMENTED_POSTS](state, payload: ICommentResponse[]) {
      state.commentedPosts = payload
    },
  },
  actions: {
    async [A.GET_PROFILE_DATA]({ commit }, payload: { id: string }) {
      const userData = await api
        .get(`/user/search?by=id&value=${payload.id}`)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(M.PROFILE_DATA, {
        ...userData.user,
        favoriteAmount: userData.favoriteAmount,
        commentAmount: userData.commentAmount,
      })
      return userData
    },
    async [A.GET_PROFILE_FAVORITED_POSTS](
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
      commit(M.PROFILE_FAVORITED_POSTS, favoritedPosts)
      return favoritedPosts
    },

    async [A.GET_PROFILE_COMMENTED_POSTS](
      { commit },
      payload: { userId: string; skip: number }
    ) {
      const { userId, skip } = payload
      const commentedPosts = await api
        .get(
          `/comment/pagination?by=userId&value=${userId}&skip=${skip}&pageSize=3`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(M.PROFILE_COMMENTED_POSTS, commentedPosts)
      return commentedPosts
    },
    async [A.UPDATE_PROFILE_SOCIAL_LINKS]({ commit }, payload: ISocialLinks) {
      let updatedUserData: IProfileData
      const userData = this.state.profile.userData
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
      commit(M.PROFILE_DATA, updatedUserData)
    },
  },
}
