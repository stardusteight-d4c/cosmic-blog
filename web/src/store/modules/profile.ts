import type { Module } from "vuex";
import { AppState } from "@/store";
import { ISocialLinks, IUser } from "@/@interfaces/user";
import { IPostResponse } from "@/@interfaces/post";
import { ICommentResponse } from "@/@interfaces/comment";
import { updateSocialLinks } from "@/utils/updateSocialLinks";
import { GET, PUT } from "@/http";

export interface IProfileState {
  user: IUser;
  favoritedPosts: IPostResponse[];
  commentedPosts: ICommentResponse[];
}

export const profileMethods = {
  mutations: {
    setUser: "SET_USER",
    setFavoritedPosts: "SET_FAVORITED_POSTS",
    setCommentedPosts: "SET_COMMENTED_POSTS",
  },
  actions: {
    getUserData: "GET_USER_DATA",
    getFavoritedPosts: "GET_FAVORITED_POSTS",
    getCommentedPosts: "GET_COMMENTED_POSTS",
    updateSocialLinks: "UPDATE_SOCIAL_LINKS",
  },
};

const mutations = profileMethods.mutations;
const actions = profileMethods.actions;

export const profile: Module<IProfileState, AppState> = {
  state: {
    user: {
      id: "",
      email: "",
      username: "",
      avatar: "",
      userRole: undefined,
      socialLinks: undefined,
      favoriteAmount: 0,
      commentAmount: 0,
    },
    favoritedPosts: [],
    commentedPosts: [],
  },
  mutations: {
    [mutations.setUser](state, payload: IUser) {
      state.user = { ...state.user, ...payload };
    },

    [mutations.setFavoritedPosts](state, payload: IPostResponse[]) {
      state.favoritedPosts = payload;
    },

    [mutations.setCommentedPosts](state, payload: ICommentResponse[]) {
      state.commentedPosts = payload;
    },
  },
  actions: {
    async [actions.getUserData]({ commit }, payload: { username: string }) {
      const user = await GET.findByUsername(payload.username);
      commit(mutations.setUser, { ...user });
      return user;
    },

    async [actions.getFavoritedPosts](
      { commit },
      payload: { userId: string; skip: number }
    ) {
      const favoritedPosts = await GET.favoritedPosts(payload);
      commit(mutations.setFavoritedPosts, favoritedPosts);
      return favoritedPosts;
    },

    async [actions.getCommentedPosts](
      { commit },
      payload: { userId: string; skip: number }
    ) {
      const commentedPosts = await GET.commentedPosts(payload);
      commit(mutations.setCommentedPosts, commentedPosts);
      return commentedPosts;
    },

    async [actions.updateSocialLinks]({ commit }, payload: ISocialLinks) {
      const updatedUser = updateSocialLinks({ store: this, payload });
      await PUT.updateUser(updatedUser);
      commit(mutations.setUser, updatedUser);
    },
  },
};
