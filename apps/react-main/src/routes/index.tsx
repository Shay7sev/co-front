import { DashboardOutlined } from '@ant-design/icons'
import { Alert, Button, Result } from 'antd'
import { lazy, Suspense } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { TOKEN, getStorage } from 'utils'
// import Layout from "@/components/Layout";
import { Layout, OutletLayoutRouter, Progress } from 'components'
import type { MenuItem } from 'components'
import Dashboard from '@/pages/dashboard'
import ErrorPage from '@/pages/error-page'
import Login from '@/pages/login'

const token = getStorage(TOKEN)

// 白名单路由不放行
const Permissions = ({ children }: any) => {
  return token ? children : <Navigate to="/login" />
}
const Guard = ({ children }: any) => {
  return token ? <Navigate to="/" /> : children
}

export const baseRouterList = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    path: 'dashboard',
    icon: <DashboardOutlined />,
    filepath: 'pages/dashboard/index.tsx',
  },
]

interface RouteObject {
  children?: RouteObject[]
  element?: React.ReactNode
  errorElement?: React.ReactNode
  path?: string
}

export const defaultRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: '/*',
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={'/'}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Guard>{<Login />}</Guard>,
  },
]

// /**/ matches zero or more directories
// reference: https://cn.vitejs.dev/guide/features.html#glob-import
export const modules = import.meta.glob('../pages/**/*.tsx')

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any
  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={
            Ele +
            ':Cannot find the path, please configure the correct folder path'
          }
          type="error"
        />
      </ErrorPage>
    )
  const Components = lazy(path)
  return (
    <Suspense fallback={<Progress />}>
      <Components />
    </Suspense>
  )
}
export const filepathToElement = (list: MenuItem[]) => {
  return list.map((item) => {
    if (item.children) {
      return {
        path: item.path,
        key: item.key,
        children: item.children?.map((c) => ({
          key: c.key,
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      }
    } else {
      return {
        key: item.key,
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      }
    }
  })
}
