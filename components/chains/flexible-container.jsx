import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { isIE } from '../utilities/helpers'

import {
  containerType,
  customHeight,
  customWidth,
} from '../utilities/custom-fields'

const classes = 'grid--content'

const FlexibleContainer = ({ customFields, children = [] }) => {
  const { ContainerType = 'div', width = 'w-full', height = '' } =
    customFields || {}

  const [gridClass, setGridClass] = useState('grid')
  useEffect(() => {
    if (isIE()) setGridClass('ie-flex')
  }, [])

  return (
    <ContainerType className={`${gridClass} ${classes} ${width} ${height}`}>
      {children}
    </ContainerType>
  )
}

FlexibleContainer.propTypes = {
  customFields: PropTypes.shape({
    ContainerType: containerType,
    width: customWidth,
    height: customHeight,
  }),
}

FlexibleContainer.label = 'Contenedor flexible'
// FlexibleContainer.static = true

export default FlexibleContainer
