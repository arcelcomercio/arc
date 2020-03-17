import React from 'react'

const classes = {
  link: 'interstitial-link',
}

function interstitialLink({ url, content }) {
  return (
    <a className={classes.link} href={url}>
      {content}
    </a>
  )
}

export default interstitialLink
