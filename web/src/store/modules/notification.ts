import type { Module } from "vuex";
import { AppState } from "@/store";
import { INotification } from "@/@interfaces/notification";
import { handleNotify } from "@/utils/handleNotify";

export interface INotificationState {
  notifications: INotification[];
}

export const notificationMethods = {
  mutations: {
    notify: "SET_NOTIFY",
  },
};
const mutations = notificationMethods.mutations;

export const notification: Module<INotificationState, AppState> = {
  state: {
    notifications: [],
  },
  mutations: {
    [mutations.notify](state, newNotification: INotification) {
      handleNotify({ state, newNotification });
    },
  },
  actions: {},
};
