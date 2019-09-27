import React from 'react'
import { withTheme } from 'styled-components'

import * as icons from './svg/index'

function Icon({ type, width, height, fill, theme, ...restProps }) {
  const IconCustom = icons[type]

  // Si no se consigue el icono renderiza nulo
  return IconCustom ? (
    <IconCustom
      width={width}
      height={height}
      fill={fill}
      theme={theme}
      {...restProps}
    />
  ) : null
}

export default withTheme(Icon)
