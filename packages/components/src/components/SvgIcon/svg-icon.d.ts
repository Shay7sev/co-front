export interface SvgProps {
  name: string // 图标的名称 ==> 必传
  color?: string //图标的颜色 ==> 非必传
  prefix?: string // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: { [key: string]: any } // 图标的样式 ==> 非必传
}
