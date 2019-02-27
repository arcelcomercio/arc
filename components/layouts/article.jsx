import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex flex--justify-center',
  contentContainer: 'flex flex--column content-layout-container',
  mainContent:
    'content-grid-base content-layout content--1col content--2col content--3col margin-top',
  zocalo: 'zocalo__container',
  main: 'content-grid-base content--1col col-2',
  sidebar: 'content-grid-base content--1col col-1',
}

const ArticleLayout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>
        {children[0] && children[0] /* Zocalo izquierda */}
      </div>
      <div className={classes.contentContainer}>
        {children[1] /* Nav */}
        {children[2] /* Header */}
        {children[3] && children[3] /* Encabezado adicional */}
        {children[4] && children[4] /* Encabezado */}
        <div className={classes.mainContent}>
          <main className={classes.main}>{children[5] /* Content */}</main>
          <aside className={classes.sidebar}>
            {children[6] /* Sidebar  */}
          </aside>
          {children[7] && children[7] /* Contenido adicional */}
        </div>
        {children[8] /* Footer */}
      </div>
      <div className={classes.zocalo}>
        {children[9] && children[9] /* Zocalo izquierda */}
      </div>
    </div>
  )
}

ArticleLayout.propTypes = {
  children: PropTypes.node,
}

ArticleLayout.sections = [
  'Zocalo izquierda',
  'Barra de navegación', // Nav
  'Encabezado adicional', // Header
  'Cabecera de página',
  'Encabezado de articulo',
  'Contenido', // Content
  'Barra lateral', // Sidebar
  'Contenido adicional',
  'Pie de página', // Footer
  'Zocalo derecha',
]

export default ArticleLayout
