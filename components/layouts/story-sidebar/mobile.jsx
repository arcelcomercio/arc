import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex justify-center',
  contentContainer:
    'flex flex-col content-layout-container w-full position-relative bg-container',
  separator: 'w-full ',
  heading: 'w-full',
  content: 'content-sidebar flex mt-20 mb-20 ',
  main: 'content-sidebar__left',
}

const StorySidebarLayout = ({ children = [] }) => {
  return (
    <>
      <div className={classes.layout}>
        <div className={classes.contentContainer}>
          {children[2] /* Publicidad Top */}
          {children[3] /*  Barra de navegación */}
          {children[4] /* Cabecera de página */}
          <section className={classes.content}>
            <div role="banner" className={classes.heading}>
              {children[6] /* Encabezado */}
            </div>
            <div role="main" className={classes.main}>
              {children[7] /* Contenido */}
            </div>
          </section>
          {children[10] /* Pie de página */}
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
