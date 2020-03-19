import React from 'react'

const classes = {
  link: 'interstitial-link block line-h-md secondary-font mb-10 mt-20 pr-20',
}

function interstitialLink({ url, content }) {
  return (
    <a className={classes.link} href={url}>
      {content}
    </a>
  )
}

export default interstitialLink
