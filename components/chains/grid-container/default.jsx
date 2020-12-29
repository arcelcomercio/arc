import * as React from 'react'
import PropTypes from 'prop-types'
import { containerType } from '../../utilities/custom-fields'

const classes =
  'content--grid-base content-layout grid--box grid--col-1 grid--col-2 grid--col-3 col-3'

const GridContainer = ({ customFields, children = [] }) => {
  const { ContainerType = 'div' } = customFields || {}

  return <ContainerType className={classes}>{children}</ContainerType>
}

GridContainer.propTypes = {
  customFields: PropTypes.shape({
    ContainerType: containerType,
  }),
}

GridContainer.label = 'Contenedor de grilla'
GridContainer.static = true

export default GridContainer
