import type { Module } from "vuex";
import type { AppState } from "@/store";
import { handleSection } from "@/utils/handleSection";

export interface IAuthState {
  session: ISession;
}

export const authMethods = {
  mutations: {
    setCurrentSession: "SET_CURRENT_SESSION",
  },
  actions: {},
};
const mutations = authMethods.mutations;

export const auth: Module<IAuthState, AppState> = {
  state: {
    session: {
      activeSession: false,
      token: undefined,
      decodedToken: undefined,
    },
  },
  mutations: {
    [mutations.setCurrentSession](state) {
      handleSection(state);
    },
  },
  actions: {},
};
