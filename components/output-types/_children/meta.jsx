/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import templayed from 'templayed'

// prettier-ignore
function Icon(props) {
  const { deployment, siteProperties, contextPath } = props

  const {
    paywall: { images },
  } = siteProperties

  const templateContext = {contextPath, ext: 'png'}
  const icon = deployment(templayed(images.icon)(templateContext))
  const apple_icon = deployment(templayed(images.apple_icon)(templateContext))
  const apple_icon_76 = deployment(templayed(images.apple_icon_76)(templateContext))
  const apple_icon_120 = deployment(templayed(images.apple_icon_120)(templateContext))
  const apple_icon_144 = deployment(templayed(images.apple_icon_144)(templateContext))
  const apple_icon_152 = deployment(templayed(images.apple_icon_152)(templateContext))
  const apple_icon_180 = deployment(templayed(images.apple_icon_180)(templateContext))

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
