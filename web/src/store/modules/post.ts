import type { Module } from 'vuex'
import { AppState } from '@/store'
import { IPostObject } from '@/@interfaces/post'
import api from '@/lib/axios'

export interface IPostState {
  home: IPostObject[]
}

export const postMethods = {
  mutations: {
    HOME_POSTS: 'MUTATION_HOME_POSTS',
  },
  actions: {
    GET_HOME_POSTS: 'ACTION_GET_HOME_POSTS',
  },
}
const M = postMethods.mutations
const A = postMethods.actions

export const post: Module<IPostState, AppState> = {
  state: {
    home: [],
  },
  mutations: {
    [M.HOME_POSTS](state, posts: IPostObject[]) {
      state.home = posts
    },
  },
  actions: {
    async [A.GET_HOME_POSTS]({ commit }, payload: { skip: number }) {
      const posts = await api.get(
        `/post/pagination?skip=${payload.skip}&pageSize=6`
      )
      commit(M.HOME_POSTS, posts.data)
      return posts
    },
  },
}
