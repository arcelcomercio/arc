import React from 'react'
import styled, { withTheme } from 'styled-components'
import {
  spacing,
  flexbox,
  sizing,
  positions,
  shadows,
  display,
} from '@material-ui/system'
import URL from 'url-parse'

const NoLineHeightPicture = styled.picture`
  line-height: 0px;
`

const Picture = props => {
  const { theme, hideOnScreenSize = 'xs', src, types, ...restProps } = props
  const { pathname, query } = new URL(src)
  const regex = new RegExp(`(?:[/\\]?)([\\w-]+)[.](${types.join('|')})$`)
  const match = pathname.match(regex)
  if (!match) throw new Error('Picture does not support that extension')

  return (
    <NoLineHeightPicture>
      {hideOnScreenSize && (
        <source
          media={theme.breakpoints.down(hideOnScreenSize, false)}
          srcSet={theme.images.pixel}
        />
      )}
      {types.map(type => (
        <source
          srcSet={pathname.replace(/\.[\w-]+$/, `.${type}`) + (query || '')}
          type={`image/${type}`}
        />
      ))}
      <img src={src} {...restProps} />
    </NoLineHeightPicture>
  )
}

const StyledPicture = styled(Picture)`
  ${spacing}
  ${flexbox}
  ${sizing}
  ${positions}
  ${shadows}
  ${display}
`

export default withTheme(StyledPicture)
