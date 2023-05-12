import {
  App,
  message as antdMessage,
  notification as antdNotification,
  Modal as antdModal,
} from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

let Message: MessageInstance = antdMessage
let Notification: NotificationInstance = antdNotification
const { ...resetFns } = antdModal
let Modal: Omit<ModalStaticFunctions, 'warn'> = resetFns

let EscapeAntd = () => {
  const staticFunction = App.useApp()
  Message = staticFunction.message
  Modal = staticFunction.modal
  Notification = staticFunction.notification
  return null
}

export { Message, Notification, Modal }

export default EscapeAntd
