import React from 'react'
// import md5 from 'md5'

const Gravatar = props => {
  // const { email } = props
  // const hash = md5(email)

  const { type, fbID } = props

  if (type === 'facebook') {
    return (
      <img
        src={`https://graph.facebook.com/${fbID}/picture?type=large&redirect=true&width=500&height=500`}
        alt="facebook"
      />
    )
  }

  return (
    <img
      src="https://www.gravatar.com/avatar/regoko44oko4e4of4oko?s=180&d=identicon"
      alt="Avatar"
    />
  )
}

export default Gravatar
