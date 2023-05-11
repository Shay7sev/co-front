import { notification } from 'antd'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const Notification = (type: NotificationType, message: string) => {
  notification[type]({
    message,
    placement: 'topRight',
  })
}
