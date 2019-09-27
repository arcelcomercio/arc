import React from 'react'
import PropTypes from 'prop-types'

function Icon({ assets }) {
  return (
    <>
      <link rel="icon" type="image/x-icon" href={assets('icon')} />
      <link rel="shortcut icon" href={assets('icon')} />
      <link rel="apple-touch-icon" href={assets('apple_icon')} />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={assets('apple_icon_76')}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={assets('apple_icon_120')}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={assets('apple_icon_144')}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={assets('apple_icon_152')}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={assets('apple_icon_180')}
      />
    </>
  )
}

function Theme({ color, siteName }) {
  return (
    <>
      <meta name="theme-color" content={color} />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
    </>
  )
}

Theme.PropType = {
  colorPrimary: PropTypes.string,
  siteName: PropTypes.oneOf(['gestion', 'elcomercio']),
}

export { Theme, Icon }
