import type { Module } from 'vuex'
import { AppState } from '@/store'
import { IPostObject } from '@/@interfaces/post'
import api from '@/lib/axios'

export interface IPostState {
  home: IPostObject[]
  post: IPostObject | undefined
}

export const postMethods = {
  mutations: {
    HOME_POSTS: 'MUTATION_HOME_POSTS',
    POST_DATA: 'MUTATION_POST_DATA',
  },
  actions: {
    GET_HOME_POSTS: 'ACTION_GET_HOME_POSTS',
    GET_POST_DATA: 'ACTION_GET_POST_DATA',
  },
}
const M = postMethods.mutations
const A = postMethods.actions

export const post: Module<IPostState, AppState> = {
  state: {
    home: [],
    post: undefined,
  },
  mutations: {
    [M.HOME_POSTS](state, posts: IPostObject[]) {
      state.home = posts
    },
    [M.POST_DATA](state, post: IPostObject) {
      state.post = post
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
    async [A.GET_POST_DATA]({ commit }, payload: { postId: number }) {
      const post = await api.get(`/post/search?by=id&value=${payload.postId}`)
      commit(M.POST_DATA, post.data.post)
      return post
    },
  },
}
