import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex flex--justify-center',
  contentContainer: 'flex flex--column content-layout-container',
  content:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  zocalo: 'zocalo__container',
}

const GridLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Publicidad Top */}
        {children[2] /* Barra de navegación */}
        {children[3] /* Cabecera de página */}
        {children[4] /* Encabezado */}
        <main className={classes.content}>{children[5] /* Contenido */}</main>
        {children[6] /* Contenido adicional */}
        {children[7] /* Pie de página */}
      </div>
      <div className={classes.zocalo}>{children[8] /* Zocalo derecha */}</div>
    </div>
  )
}

GridLayout.propTypes = {
  children: PropTypes.node,
}

GridLayout.sections = [
  'Zocalo izquierda',
  'Publicidad Top',
  'Barra de navegación',
  'Cabecera de página',
  'Encabezado',
  'Contenido',
  'Contenido adicional',
  'Pie de página',
  'Zocalo derecha',
]

export default GridLayout
