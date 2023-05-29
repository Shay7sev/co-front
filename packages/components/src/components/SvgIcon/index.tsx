import { SvgProps } from './svg-icon'

export default function SvgIcon(props: SvgProps) {
  const {
    name,
    prefix = 'icon',
    iconStyle = { width: '1em', height: '1em', fill: 'currentColor' },
  } = props
  const symbolId = `#${prefix}-${name}`
  return (
    <svg aria-hidden="true" style={iconStyle}>
      <use href={symbolId} />
    </svg>
  )
}
