import './index.css'

import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import { store, Provider } from 'store'
import 'virtual:svg-icons-register'

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)
root.render(
  <Provider store={store}>
    <BrowserRouter
      // 生产环境配置二级路径
      basename={'/' + import.meta.env.BASE_URL.replaceAll('/', '')}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890FF',
          },
        }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
)
