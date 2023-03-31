export type NotificationType = 'SUCCESS' | 'ERROR' | 'WARNING'

export interface INotification {
  title: string
  content: string
  type: NotificationType
  id: number
}
