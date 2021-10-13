import PropTypes from 'prop-types'
import * as React from 'react'

const AmpOutputType = ({ children = [] }) => {
  const style = { margin: 0 }
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
      </head>
      <body style={style}>{children}</body>
    </html>
  )
}

AmpOutputType.fallback = false

AmpOutputType.propTypes = {
  children: PropTypes.node,
}

export default AmpOutputType
