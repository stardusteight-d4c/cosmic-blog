import type { Module } from 'vuex'
import { AppState } from '@/store'
import { IPostObject } from '@/@interfaces/post'
import api from '@/lib/axios'
import { getSessionCookie } from '@/utils/getSessionCookie'
import { IComment } from '@/@interfaces/comment'
import { updateCommentInArray } from '@/utils/updateCommentInArray'

export interface IPostState {
  home: IPostObject[]
  post: IPostObject | undefined
  comments: IComment[]
}

export const postMethods = {
  mutations: {
    HOME_POSTS: 'MUTATION_HOME_POSTS',
    POST_DATA: 'MUTATION_POST_DATA',
    SET_IS_FAVORITED: 'SET_IS_FAVORITED',
    SET_COMMENTS: 'SET_COMMENTS',
    SET_FAVORITE_AMOUNT: 'SET_FAVORITE_AMOUNT',
    SET_COMMENT_AMOUNT: 'SET_COMMENT_AMOUNT',
  },
  actions: {
    GET_HOME_POSTS: 'ACTION_GET_HOME_POSTS',
    GET_POST_DATA: 'ACTION_GET_POST_DATA',
    GET_COMMENTS: 'ACTION_GET_COMMENTS',
    SEARCH_BY_TITLE: 'ACTION_SEARCH_BY_TITLE',
    TOGGLE_FAVORITE: 'ACTION_TOGGLE_FAVORITE',
    LEAVE_A_COMMENT: 'ACTION_LEAVE_A_COMMENT',
    DELETE_COMMENT: 'ACTION_DELETE_COMMENT',
    UPDATE_COMMENT: 'ACTION_UPDATE_COMMENT',
  },
}
const M = postMethods.mutations
const A = postMethods.actions

export const post: Module<IPostState, AppState> = {
  state: {
    home: [],
    post: undefined,
    comments: [],
  },
  mutations: {
    [M.HOME_POSTS](state, posts: IPostObject[]) {
      state.home = posts
    },
    [M.POST_DATA](state, post: IPostObject) {
      state.post = post
    },
    [M.SET_IS_FAVORITED](state, isFavorited: boolean) {
      state.post!.isFavorited = isFavorited
    },
    [M.SET_COMMENTS](state, comments: IComment[]) {
      state.comments = comments
    },
    [M.SET_FAVORITE_AMOUNT](state, isFavorited: boolean) {
      if (isFavorited) {
        state.post!.favoriteAmount = state.post!.favoriteAmount + 1
      } else {
        state.post!.favoriteAmount = state.post!.favoriteAmount - 1
      }
    },
    [M.SET_COMMENT_AMOUNT](state, isCommenting: boolean) {
      if (isCommenting) {
        state.post!.commentAmount = state.post!.commentAmount + 1
      } else {
        state.post!.commentAmount = state.post!.commentAmount - 1
      }
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
    async [A.GET_POST_DATA]({ commit }, payload: { postId: string }) {
      const authorization = getSessionCookie()
      const post = await api.get(`/post/${payload.postId}`, {
        headers: {
          Authorization: authorization,
        },
      })
      commit(M.POST_DATA, {
        ...post.data.post,
        isAuthor: post.data.isAuthor,
        isGuest: post.data.isGuest,
        isFavorited: post.data.isFavorited,
        favoriteAmount: post.data.favoriteAmount,
        commentAmount: post.data.commentAmount,
      })
      return post.data
    },
    async [A.SEARCH_BY_TITLE]({ commit }, payload: { title: string }) {
      const posts = await api.get(`/post/title?equals=${payload.title}`)
      commit(M.HOME_POSTS, posts.data)
    },
    async [A.TOGGLE_FAVORITE](_, payload: { postId: string; userId: string }) {
      await api.put(`/favorite/toggle`, payload)
    },
    async [A.GET_COMMENTS](
      { commit },
      payload: { postId: string; skip: number }
    ) {
      const comments = await api
        .get(
          `/comment/pagination?by=postId&value=${payload.postId}&skip=${payload.skip}&pageSize=4`
        )
        .then((res) => res.data)
        .catch((error) => console.log(error))
      commit(M.SET_COMMENTS, comments)
    },
    async [A.LEAVE_A_COMMENT]({ dispatch }, payload: IComment) {
      const comment = await api
        .post('/comment', payload)
        .then((res) => res.data)
        .catch((error) => console.log(error))
      await dispatch(A.GET_COMMENTS, { postId: payload.postId, skip: 0 })
    },
    async [A.DELETE_COMMENT](
      { dispatch },
      payload: { commentId: string; postId: string; skip: number }
    ) {
      const { commentId, postId, skip } = payload
      await api
        .delete(`/comment/${commentId}`)
        .catch((error) => console.log(error))
      dispatch(A.GET_COMMENTS, { postId, skip })
    },
    async [A.UPDATE_COMMENT]({ state, commit }, updatedComment: IComment) {
      await api.put('/comment', updatedComment)
      const updatedComments = updateCommentInArray(
        state.comments,
        updatedComment
      )
      commit(M.SET_COMMENTS, updatedComments)
    },
  },
}
