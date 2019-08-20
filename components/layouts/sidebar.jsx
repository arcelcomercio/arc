import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex justify-center',
  contentContainer:
    'flex flex-col content-layout-container w-full bg-container',
  content: 'content-sidebar flex mt-20 mb-20',
  zocalo: 'ads__zocalo',
  main: 'content-sidebar__left',
  sidebar: 'content-sidebar__right',
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
          <div role="main" className={classes.main}>
            {children[5] /* Contenido */}
          </div>
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
