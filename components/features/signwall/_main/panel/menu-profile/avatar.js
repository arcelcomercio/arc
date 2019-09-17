import React from 'react'
import { WrapperAvatar } from './styles'

// eslint-disable-next-line import/prefer-default-export
export const Avatar = () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <WrapperAvatar>
      <img
        src="https://www.gravatar.com/avatar/regoko44oko4e4of4oko?s=180&d=identicon"
        alt="Avatar"
      />
    </WrapperAvatar>
  )
}
