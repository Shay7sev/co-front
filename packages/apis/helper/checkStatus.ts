import { Notification } from 'components'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      Notification('error', '请求失败！请您稍后重试')
      break
    case 401:
      Notification('error', '登录失效！请您重新登录')
      break
    case 403:
      Notification('error', '当前账号无权限访问！')
      break
    case 404:
      Notification('error', '你所访问的资源不存在！')
      break
    case 405:
      Notification('error', '请求方式错误！请您稍后重试')
      break
    case 408:
      Notification('error', '请求超时！请您稍后重试')
      break
    case 500:
      Notification('error', '服务异常！')
      break
    case 502:
      Notification('error', '网关错误！')
      break
    case 503:
      Notification('error', '服务不可用！')
      break
    case 504:
      Notification('error', '网关超时！')
      break
    default:
      Notification('error', '请求失败！')
  }
}
