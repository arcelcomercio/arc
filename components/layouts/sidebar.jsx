import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex flex--justify-center',
  contentContainer: 'flex flex--column content-layout-container',
  content:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  zocalo: 'zocalo__container',
  main: 'content-grid-base content--1col col-2',
  sidebar: 'content-grid-base content--1col col-1',
}

const SidebarLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Publicidad Top */}
        {children[2] /* Barra de navegación */}
        {children[3] /* Cabecera de página */}
        {children[4] /* Encabezado */}
        <div className={classes.content}>
          <main className={classes.main}>{children[5] /* Contenido */}</main>
          <aside className={classes.sidebar}>
            {children[6] /* Barra lateral */}
          </aside>
          {children[7] /* Contenido adicional */}
        </div>
        {children[8] /* Pie de página */}
      </div>
      <div className={classes.zocalo}>{children[9] /* Zocalo derecha */}</div>
    </div>
  )
}

SidebarLayout.propTypes = {
  children: PropTypes.node,
}

SidebarLayout.sections = [
  'Zocalo izquierda',
  'Publicidad Top',
  'Barra de navegación',
  'Cabecera de página',
  'Encabezado',
  'Contenido',
  'Barra lateral',
  'Contenido adicional',
  'Pie de página',
  'Zocalo derecha',
]

export default SidebarLayout
