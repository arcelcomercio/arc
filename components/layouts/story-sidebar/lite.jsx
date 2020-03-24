import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'f just-center',
  contentContainer: 'st-sidebar__container f f-col w-full pos-rel',
  separator: 'w-full ',
  heading: 'w-full',
  content: 'st-sidebar__content f',
  main: 'st-sidebar__main',
  sidebar: 'st-sidebar__side',
  zocalo: 'ads__zocalo',
}

const StorySidebarLayout = ({ children = [] }) => {
  return (
    <>
      {children[0] /* Barra de navegación Amp */}
      <div className={classes.layout}>
        <div className={classes.zocalo}>
          {children[1] /* Zocalo izquierda */}
        </div>
        <div className={classes.contentContainer}>
          {children[2] /* Publicidad Top */}
          {children[3] /*  Barra de navegación */}

          {children[4] /* Cabecera de página */}
          {children[5] && (
            <div className={classes.separator}>{children[5]}</div>
          ) /* Separador */}
          <section className={classes.content}>
            <div role="banner" className={classes.heading}>
              {children[6] /* Encabezado */}
            </div>
            <div role="main" className={classes.main}>
              {children[7] /* Contenido */}
            </div>
            {children[8] && (
              <aside className={classes.sidebar}>
                {children[8] /* Barra lateral */}
              </aside>
            )}
            {children[9] /* Contenido adicional */}
          </section>
          {children[10] /* Pie de página */}
        </div>
        <div className={classes.zocalo}>
          {children[11] /* Zocalo derecha */}
        </div>
      </div>
    </>
  )
}

StorySidebarLayout.propTypes = {
  children: PropTypes.node,
}

StorySidebarLayout.sections = [
  'Sidebar Amp',
  'Zocalo izquierda',
  'Publicidad Top',
  'Barra de navegación',
  'Cabecera de página',
  'Separador',
  'Encabezado',
  'Contenido',
  'Barra lateral',
  'Contenido adicional',
  'Pie de página',
  'Zocalo derecha',
]

export default StorySidebarLayout
