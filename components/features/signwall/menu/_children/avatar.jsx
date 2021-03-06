import md5 from 'crypto-js/md5'
import * as React from 'react'

import { WrapperAvatar } from '../styled'

export const Avatar = ({ mainColorBr, typeLogin, userFB, userMAIL }) => {
  const hashMAIL = md5(userMAIL).toString()
  return (
    <WrapperAvatar br={mainColorBr}>
      {typeLogin === 'facebook' ? (
        <img
          src={`https://graph.facebook.com/${userFB}/picture?type=large&redirect=true&width=500&height=500`}
          alt="facebook"
        />
      ) : (
        <img
          src={`https://www.gravatar.com/avatar/${hashMAIL}?s=180&d=identicon`}
          alt="Avatar"
        />
      )}
    </WrapperAvatar>
  )
}
