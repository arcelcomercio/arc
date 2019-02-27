import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex flex--justify-center',
  contentContainer: 'flex flex--column content-layout-container',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  zocalo: 'zocalo__container',
}

const BasicLayout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Nav */}
        {children[2] /* Header */}
        <div className={classes.mainContent}>{children[3] /* Content */}</div>
        {children[4] /* Footer */}
      </div>
      <div className={classes.zocalo}>{children[5] /* Zocalo izquierda */}</div>
    </div>
  )
}

BasicLayout.propTypes = {
  children: PropTypes.node,
}

BasicLayout.sections = [
  'Zocalo izquierda',
  'Barra de navegación', // Nav
  'Cabecera de página', // Header
  'Contenido', // Content
  'Pie de página', // Footer
  'Zocalo derecha',
]

export default BasicLayout
