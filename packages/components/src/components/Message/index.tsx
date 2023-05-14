import { useState } from 'react'
// material-ui
import { Snackbar, Alert, AlertColor } from '@mui/material'

function Message(props: { content?: string | undefined; duration?: number | undefined; type: AlertColor }) {
  const { content, duration, type = 'info' } = { ...props }
  // 开关控制：默认true,调用时会直接打开
  const [open, setOpen] = useState(true)
  // 关闭消息提示
  const handleClose = (event: any, reason: any) => {
    console.log(event,reason)
    setOpen(false)
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
      onClose={handleClose}>
      <Alert severity={type} variant="standard">
        {content}
      </Alert>
    </Snackbar>
  )
}

import { createRoot } from 'react-dom/client'

// 创建一个dom
const dom = document.createElement('div')

const message = {
    success({ content = '', duration = 1000 }) {
        // 定义组件，
        const JSXdom = <Message content={content} duration={duration} type="success"></Message>
        // 渲染DOM
        createRoot(dom).render(JSXdom)
        // 置入到body节点下
        document.body.appendChild(dom)
    },
    error({ content = '', duration = 2000 }) {
        const JSXdom = <Message content={content} duration={duration} type="error"></Message>
        createRoot(dom).render(JSXdom)
        document.body.appendChild(dom)
    },
    warning({ content = '', duration = 1000 }) {
        const JSXdom = <Message content={content} duration={duration} type="warning"></Message>
        createRoot(dom).render(JSXdom)
        document.body.appendChild(dom)
    },
    info({ content = '', duration = 1000 }) {
        const JSXdom = <Message content={content} duration={duration} type="info"></Message>
        createRoot(dom).render(JSXdom)
        document.body.appendChild(dom)
    }
}

export default message