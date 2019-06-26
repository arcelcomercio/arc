import React from 'react'
import { getMultimediaIcon } from '../utilities/helpers'

const classes = {
  icon: `m-icon position-absolute rounded text-white`,
}

export default ({ iconClass, type }) => {
  return (
    <i className={`${classes.icon} ${iconClass} ${getMultimediaIcon(type)}`} />
  )
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
