import { INotification } from "@/@interfaces/notification"
import { INotificationState } from "@/store/modules/notification"

export function handleNotify(request: { state: INotificationState, newNotification: INotification }) {
  const { state, newNotification } = request
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
}