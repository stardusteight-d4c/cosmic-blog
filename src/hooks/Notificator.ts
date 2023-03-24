import type { NotificationType } from '@interfaces/notification'
import { store } from '@/store'
import { MUTATION_NOTIFY } from '@/store/mutations'

type Notificator = {
  notify: (type: NotificationType,  content: string, title?: string) => void
}

export default (): Notificator => {
  const notify = (
    type: NotificationType,
    content: string,
    title?: string
  ): void => {
    store.commit(MUTATION_NOTIFY, {
      title,
      content,
      type,
    })
  }
  return {
    notify,
  }
}
