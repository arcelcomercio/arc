import React from 'react'
import PropTypes from 'prop-types'
import {
  containerType,
  customHeight,
  customWidth,
} from '../utilities/custom-fields'

const classes = 'grid grid--content'

const FlexibleContainer = ({ customFields, children = [] }) => {
  const { ContainerType = 'div', width = 'full-width', height = '' } =
    customFields || {}

  return (
    <ContainerType className={`${classes} ${width} ${height}`}>
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

export default FlexibleContainer
