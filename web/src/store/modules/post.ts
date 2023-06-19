import type { Module } from "vuex";
import { AppState } from "@/store";
import { updateCommentInArray } from "@/utils/updateCommentInArray";
import { GET, POST, PUT, DELETE } from "@/http";

export interface IPostState {
  home: IPostResponse[];
  post: IPostResponse | undefined;
  comments: IComment[];
  filteringPosts: IPostResponse[];
}

export const postMethods = {
  mutations: {
    setHomePosts: "SET_HOME_POSTS",
    setPost: "SET_POST_DATA",
    setIsFavorited: "SET_IS_FAVORITED",
    setComments: "SET_COMMENTS",
    setFilteringPosts: "SET_FILTERING_POSTS",
    setFavoriteAmount: "SET_FAVORITE_AMOUNT",
    setCommentAmount: "SET_COMMENT_AMOUNT",
  },
  actions: {
    getHomePosts: "GET_HOME_POSTS",
    getPost: "GET_POST_DATA",
    getPostBySlug: "GET_POST_DATA_BY_SLUG",
    getComments: "GET_COMMENTS",
    getFilteringPosts: "GET_FILTERING_POSTS",
    searchByTitle: "SEARCH_BY_TITLE",
    toggleFavorite: "TOGGLE_FAVORITE",
    leaveComment: "LEAVE_A_COMMENT",
    deleteComment: "DELETE_COMMENT",
    updateComment: "UPDATE_COMMENT",
  },
};

const mutations = postMethods.mutations;
const actions = postMethods.actions;

export const post: Module<IPostState, AppState> = {
  state: {
    home: [],
    post: undefined,
    comments: [],
    filteringPosts: [],
  },
  mutations: {
    [mutations.setHomePosts](state, posts: IPostResponse[]) {
      state.home = posts;
    },

    [mutations.setPost](state, post: IPostResponse) {
      state.post = post;
    },

    [mutations.setIsFavorited](state, isFavorited: boolean) {
      state.post!.isFavorited = isFavorited;
    },

    [mutations.setComments](state, comments: IComment[]) {
      state.comments = comments;
    },

    [mutations.setFilteringPosts](state, posts: IPostResponse[]) {
      state.filteringPosts = [...state.filteringPosts, ...posts];
    },

    [mutations.setFavoriteAmount](state, isFavorited: boolean) {
      if (isFavorited) {
        state.post!.favoriteAmount = state.post!.favoriteAmount + 1;
      } else {
        state.post!.favoriteAmount = state.post!.favoriteAmount - 1;
      }
    },

    [mutations.setCommentAmount](state, isCommenting: boolean) {
      if (isCommenting) {
        state.post!.commentAmount = state.post!.commentAmount + 1;
      } else {
        state.post!.commentAmount = state.post!.commentAmount - 1;
      }
    },
  },
  actions: {
    async [actions.getHomePosts]({ commit }, payload: { skip: number }) {
      const posts = await GET.homePosts(payload.skip);
      commit(mutations.setHomePosts, posts);
      return posts;
    },

    async [actions.getPost]({ commit }, payload: { postId: string }) {
      const post = await GET.post(payload.postId);
      commit(mutations.setPost, post);
      return post;
    },

    async [actions.getPostBySlug]({ commit }, payload: { slug: string }) {
      const post = await GET.postBySlug(payload.slug);
      commit(mutations.setPost, post);
      return post;
    },

    async [actions.getFilteringPosts](
      { commit },
      payload: { tag: string; skip: number}
    ) {
      const posts = await GET.postsByTagWithPagination(payload);
      commit(mutations.setFilteringPosts, posts);
      return posts;
    },

    async [actions.searchByTitle](_, payload: { title: string }) {
      const posts = await GET.searchByTitle(payload.title);
      return posts;
    },

    async [actions.toggleFavorite](
      _,
      payload: { postId: string; userId: string }
    ) {
      await PUT.toggleFavorite(payload);
    },

    async [actions.getComments](
      { commit },
      payload: { postId: string; skip: number }
    ) {
      const comments = await GET.comments(payload);
      commit(mutations.setComments, comments);
    },

    async [actions.leaveComment]({ dispatch }, payload: IComment) {
      await POST.leaveComment(payload);
      await dispatch(actions.getComments, { postId: payload.post.id, skip: 0 });
    },

    async [actions.deleteComment](
      { dispatch },
      payload: {
        commentId: string;
        ownerId: string;
        postId: string;
        skip: number;
      }
    ) {
      const { commentId, ownerId, postId, skip } = payload;
      await DELETE.deleteComment({ commentId, ownerId });
      dispatch(actions.getComments, { postId, skip });
    },

    async [actions.updateComment]({ state, commit }, updatedComment: IComment) {
      await PUT.updateComment(updatedComment);
      const updatedComments = updateCommentInArray(
        state.comments,
        updatedComment
      );
      commit(mutations.setComments, updatedComments);
    },
  },
};
