import { useEffect } from 'react'
import { useLocation, useRoutes, Location } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Settings, ADMIN, ROUTER_WHITE_LIST, TOKEN, removeStorage } from 'utils'
import { setMenu, setUserToken, store } from 'store'
import { MenuData } from '@/common/mock'
import { defaultRoutes, filepathToElement } from './index'
import { cloneDeep } from 'lodash'

//全局路由守卫
function guard(location: Location, token: string) {
  // 1.动态设置标题
  const { pathname } = location
  document.title = `${Settings.title}: ${pathname.replace('/', '')}`

  // 2.判断访问页面是否在路由白名单地址中，如果存在直接放行 layout路由因为permission组件不通行
  if (ROUTER_WHITE_LIST.includes(pathname)) return true

  // 3.判断是否有 Token
  if (!token) {
    removeStorage(TOKEN)
    store.dispatch(setUserToken(''))
  }

  return true
}

export const RouterGurad = () => {
  const {
    user: { token, menu },
  } = useAppSelector((state) => state)
  const location = useLocation()
  const dispatch = useAppDispatch()

  const cloneDefaultRoutes = cloneDeep(defaultRoutes)
  cloneDefaultRoutes[0].children = [
    ...filepathToElement(menu),
    ...cloneDefaultRoutes[0].children!,
  ]

  useEffect(() => {
    /**
     * @deprecated 权限菜单控制
     */
    if ((token as unknown as { username: string })?.username === ADMIN) {
      dispatch(setMenu([...MenuData.admin]))
    } else {
      dispatch(setMenu([...MenuData.user]))
    }
  }, [token])

  useEffect(() => {
    guard(location, token)
  }, [location])

  const Route = useRoutes(cloneDefaultRoutes)
  return Route
}
