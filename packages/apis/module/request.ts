// import request from 'umi-request'

// export { request }

import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import { ResultData } from '../interface'
import { ResultEnum } from '../enums/httpEnum'
import { checkStatus } from '../helper/checkStatus'
import { Message } from 'components'
import { Loading } from 'components'

import { store, setUserToken } from 'store'

import { LOGIN_URL } from '../config/config'
import { removeStorage, TOKEN } from 'utils'

const config = {
  // 默认地址请求地址，可在 .env.*** 文件中修改
  baseURL: process.env.VITE_BASE_API,
  // 设置超时时间（30s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  // withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading
        config.headers!.noLoading || Loading.show()
        const { user } = store.getState()
        const token = user.token || ''
        if (config.headers && typeof config.headers?.set === 'function')
          config.headers.set('x-access-token', token)
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        // * 在请求结束后，并关闭请求 loading
        Loading.hide()
        // * 登陆失效（code == 401）
        if (data.code === ResultEnum.OVERDUE) {
          Message.error({ content: data.msg || '' })
          removeStorage(TOKEN)
          setUserToken('')
          window.location.replace(process.env.VITE_BASE_API + LOGIN_URL)
          return Promise.reject(data)
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          Message.error({ content: data.msg || '' })
          return Promise.reject(data)
        }
        // * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        // tryHideFullScreenLoading()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1)
          Message.error({ content: '请求超时！请您稍后重试' })
        if (error.message.indexOf('Network Error') !== -1)
          Message.error({ content: '网络错误！请您稍后重试' })
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) {
          window.location.replace(process.env.VITE_BASE_API + '/500')
        }
        return Promise.reject(error)
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, {
      params,
      ..._object,
    })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<Blob> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
