import React from 'react'
import md5 from 'md5'
import { WrapperAvatar } from './styles'

// eslint-disable-next-line import/prefer-default-export
export const Avatar = props => {
  const { typeLogin, arcSite, emailUser, userNameFB } = props
  const hash = md5(emailUser) || 'regoko44oko4e4of4oko'
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <WrapperAvatar arcSite={arcSite}>
      {typeLogin === 'facebook' ? (
        <img
          src={`https://graph.facebook.com/${userNameFB}/picture?type=large&redirect=true&width=500&height=500`}
          alt="facebook"
        />
      ) : (
        <img
          src={`https://www.gravatar.com/avatar/${hash}?s=180&d=identicon`}
          alt="Avatar"
        />
      )}
    </WrapperAvatar>
  )
}
