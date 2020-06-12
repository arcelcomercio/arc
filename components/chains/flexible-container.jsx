import React from 'react'
import PropTypes from 'prop-types'

import {
  containerType,
  customHeight,
  customWidth,
  containerClass,
  containerCustomClass,
} from '../utilities/custom-fields'

const classes = 'grid grid--content'

const FlexibleContainer = ({ customFields, children = [] }) => {
  const {
    ContainerType = 'div',
    width = 'w-full',
    height = '',
    ContainerClass = '',
    ContainerCustomClass = '',
  } = customFields || {}

  return (
    <ContainerType
      className={`${classes} ${width} ${height} ${ContainerClass} ${ContainerCustomClass}`}>
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
    ContainerCustomClass: containerCustomClass,
  }),
}

FlexibleContainer.label = 'Contenedor flexible'
// FlexibleContainer.static = true

export default FlexibleContainer
