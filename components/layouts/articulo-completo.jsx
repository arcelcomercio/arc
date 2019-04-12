import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex flex--justify-center',
  contentContainer: 'flex flex--column content-layout-container',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  zocalo: 'zocalo__container',
  sidebar: 'content-grid-base content--1col col-1',
}

const FullArticleLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Nav */}
        {children[2] /* Cabecera adicional */}
        {children[3] /* Header */}
        {children[4] /* Encabezado */}
        <main>{children[5] /* Content */}</main>
        {children[6] /* Contenido adicional */}
        {children[7] /* Footer */}
      </div>
      <div className={classes.zocalo}>{children[8] /* Zocalo izquierda */}</div>
    </div>
  )
}

FullArticleLayout.propTypes = {
  children: PropTypes.node,
}

FullArticleLayout.sections = [
  'Zocalo izquierda',
  'Barra de navegación', // Nav
  'Cabecera adicional',
  'Cabecera de página', // Header
  'Encabezado',
  'Contenido', // Content
  'Contenido adicional',
  'Pie de página', // Footer
  'Zocalo derecha',
]

export default FullArticleLayout
