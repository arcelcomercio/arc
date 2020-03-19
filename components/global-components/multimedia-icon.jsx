import React from 'react'
import getMultimediaIcon from '../utilities/multimedia-icon'

const classes = {
  icon: `m-icon position-absolute rounded text-white`,
}

export default ({ iconClass = '', type = '' }) => {
  const icon = getMultimediaIcon(type)
  return icon && <i className={`${classes.icon} ${iconClass} ${icon}`} />
}

/**
 *
 * Clases que normalmente se personalizarian desde iconClass
 *
 * font-size,
 * width,
 * height,
 * top,
 * left
 *
 */
