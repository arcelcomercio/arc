import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  containerType,
  customHeight,
  customWidth,
  containerClass,
} from '../utilities/custom-fields'

export const isIE = () => {
  const ua = window.navigator.userAgent
  const msie = ua.indexOf('MSIE ')
  const trident = ua.indexOf('Trident/')
  if (msie > 0 || trident > 0) {
    return true
  }
  return false
}

const classes = 'grid--content'

const FlexibleContainer = ({ customFields, children = [] }) => {
  const {
    ContainerType = 'div',
    width = 'w-full',
    height = '',
    ContainerClass = '',
  } = customFields || {}

  const [gridClass, setGridClass] = useState('grid')
  useEffect(() => {
    if (isIE()) setGridClass('ie-flex')
  }, [])

  return (
    <ContainerType
      className={`${gridClass} ${classes} ${width} ${height} ${ContainerClass}`}>
      {children}
    </ContainerType>
  )
}

FlexibleContainer.propTypes = {
  customFields: PropTypes.shape({
    ContainerType: containerType,
    width: customWidth,
    height: customHeight,
    ContainerClass: containerClass,
  }),
}

FlexibleContainer.label = 'Contenedor flexible'
// FlexibleContainer.static = true

export default FlexibleContainer
