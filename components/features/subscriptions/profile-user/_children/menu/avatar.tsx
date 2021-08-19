import md5 from 'crypto-js/md5'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { ArcSite } from 'types/fusion'

import { SITE_TROME } from '../../../../../utilities/constants/sitenames'

const classes = {
  avatar: 'profile-avatar',
  avatarImg: 'profile-avatar__img',
}

interface ProfileAvatarProps {
  arcSite: ArcSite
  email: string
  username: string
  loginType: string
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = (props) => {
  const { arcSite, email, username, loginType } = props
  const emailHash = md5(email).toString()

  const {
    signwall: { mainColorBr },
  } = getProperties(arcSite)

  return (
    <div
      className={classes.avatar}
      style={{ borderColor: arcSite === SITE_TROME ? 'black' : mainColorBr }}>
      <img
        src={
          loginType === 'facebook'
            ? `https://graph.facebook.com/${username}/picture?type=large&redirect=true&width=500&height=500`
            : `https://www.gravatar.com/avatar/${emailHash}?s=180&d=identicon`
        }
        alt="Avatar"
        className={classes.avatarImg}
      />
    </div>
  )
}

export default ProfileAvatar
