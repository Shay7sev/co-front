import { createRoot } from 'react-dom/client'
import './index.css'
import { Spin } from 'antd'

class Loading {
  domNode: HTMLElement
  isExistNode: boolean
  timer: any
  constructor() {
    this.domNode = document.createElement('div')
    this.domNode.setAttribute('id', 'loading')
    this.isExistNode = false
  }

  private render(visible: boolean) {
    if (!this.isExistNode && visible) {
      document.body.appendChild(this.domNode)
      const children = this.createNode()
      createRoot(this.domNode).render(children)
      this.isExistNode = true
    }
    if (visible) {
      document.body.appendChild(this.domNode)
    } else {
      document.getElementById('loading') && document.body.removeChild(document.getElementById('loading')!)
    }
  }
  createNode() {
    const node = <Spin tip="加载中..." size="large" />
    return node
  }

  show(isDelay = true, delay = 300) {
    this.timer && clearTimeout(this.timer)
    if (!isDelay) {
      this.render(true)
    } else {
      // 防闪烁
      this.timer = setTimeout(() => this.render(true), delay)
    }
  }

  hide() {
    this.timer && clearTimeout(this.timer)
    this.render(false)
  }
}

export default new Loading()
