import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col content-layout-container w-full',
  separator: 'w-full mb-20',
  heading: 'col-3',
  content:
    'grid grid--content content-layout grid--col-1 grid--col-2 grid--col-3 mb-20 bg-link text-white',
  zocalo: 'zocalo__container',
  main: 'grid grid--content grid--col-1 col-2',
  sidebar: 'grid grid--content grid--col-1 col-1',
}

const StorySidebarLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div role="complementary" className={classes.zocalo}>
        {children[0] /* Zocalo izquierda */}
      </div>
      <div className={classes.contentContainer}>
        {children[1] /* Publicidad Top */}
        {children[2] /* Barra de navegación */}
        {children[3] /* Cabecera de página */}
        {children[4] && (
          <div role="separator" className={classes.separator}>
            {children[4]}
          </div>
        ) /* Separador */}
        <section className={classes.content}>
          <div role="banner" className={classes.heading}>
            {children[5] /* Encabezado */}
          </div>
          <main className={classes.main}>{children[6] /* Contenido */}</main>
          <aside className={classes.sidebar}>
            {children[7] /* Barra lateral */}
          </aside>
          {children[8] /* Contenido adicional */}
        </section>
        {children[9] /* Pie de página */}
      </div>
      <div role="complementary" className={classes.zocalo}>
        {children[10] /* Zocalo derecha */}
      </div>
    </div>
  )
}

StorySidebarLayout.propTypes = {
  children: PropTypes.node,
}

StorySidebarLayout.sections = [
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
