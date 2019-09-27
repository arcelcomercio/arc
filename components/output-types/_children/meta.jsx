/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'

import { interpolateUrl } from '../../features/paywall/_dependencies/domains'

function Icon(props) {
  const { deployment, siteProperties } = props

  const {
    paywall: { urls },
  } = siteProperties

  const icon = deployment(interpolateUrl(urls.icon))
  const apple_icon = deployment(interpolateUrl(urls.apple_icon))
  const apple_icon_76 = deployment(interpolateUrl(urls.apple_icon_76))
  const apple_icon_120 = deployment(interpolateUrl(urls.apple_icon_120))
  const apple_icon_144 = deployment(interpolateUrl(urls.apple_icon_144))
  const apple_icon_152 = deployment(interpolateUrl(urls.apple_icon_152))
  const apple_icon_180 = deployment(interpolateUrl(urls.apple_icon_180))

  return (
    <>
      <link rel="icon" type="image/x-icon" href={icon} />
      <link rel="shortcut icon" href={icon} />
      <link rel="apple-touch-icon" href={apple_icon} />
      <link rel="apple-touch-icon" sizes="76x76" href={apple_icon_76} />
      <link rel="apple-touch-icon" sizes="120x120" href={apple_icon_120} />
      <link rel="apple-touch-icon" sizes="144x144" href={apple_icon_144} />
      <link rel="apple-touch-icon" sizes="152x152" href={apple_icon_152} />
      <link rel="apple-touch-icon" sizes="180x180" href={apple_icon_180} />
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
