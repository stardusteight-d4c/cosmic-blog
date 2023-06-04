import type { Module } from 'vuex'
import { AppState } from '@/store'
import { MUTATION_NOTIFY } from '@/store/mutations'
import { INotification } from '@/@interfaces/notification'

export interface INotificationState {
  notifications: INotification[]
}

export const notification: Module<INotificationState, AppState> = {
  state: {
    notifications: [],
  },
  mutations: {
    [MUTATION_NOTIFY](state, newNotification: INotification) {
      console.log(state, newNotification)

      const indexResult = state.notifications.findIndex(
        (notification) => notification.content === newNotification.content
      )
      const notificationDoesNotExistYet = indexResult < 0
      function removeNotificationAfterAWhile() {
        setTimeout(() => {
          state.notifications = state.notifications.filter(
            (notification) => notification.id !== newNotification.id
          )
        }, 4000)
      }
      if (notificationDoesNotExistYet) {
        newNotification.id = new Date().getTime()
        state.notifications.push(newNotification)
        removeNotificationAfterAWhile()
      }
    },
  },
  actions: {},
}
