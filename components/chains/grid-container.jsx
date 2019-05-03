import React from 'react'
import PropTypes from 'prop-types'
import { containerType } from '../utilities/custom-fields'

const classes =
  'content--grid-base content-layout content--box content--1col content--2col content--3col col-3'

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

export default GridContainer
