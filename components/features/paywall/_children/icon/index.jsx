import React from 'react'
import * as icons from './svg/index'

function Icon({
  type,
  width = '16',
  height = '16',
  fill = '#444',
  ...restProps
}) {
  const IconCustom = icons[type]

  return <IconCustom width={width} height={height} fill={fill} {...restProps} />
}

export default Icon
