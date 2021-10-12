import PropTypes from 'prop-types'
import * as React from 'react'

const AmpOutputType = ({ children = [], arcSite }) => {
  console.log('asd')
  return (
    <html itemScope itemType="http://schema.org/WebPage" lang="es">
      <body>{children}</body>
    </html>
  )
}

AmpOutputType.fallback = false

AmpOutputType.propTypes = {
  children: PropTypes.node,
  arcSite: PropTypes.string,
}

export default AmpOutputType
