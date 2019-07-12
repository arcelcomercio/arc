import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { isIE } from '../utilities/helpers'

const classes = {
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col content-layout-container w-full',
  separator: 'w-full mb-20',
  heading: 'col-3',
  content:
    'grid--content content-layout grid--col-1 grid--col-2 grid--col-3 mb-20 ',
  zocalo: 'ads__zocalo',
  main: 'grid--content grid--col-1 col-2',
  sidebar: 'grid--content grid--col-1 col-1',
}

const StorySidebarLayout = ({ children = [] }) => {
  const [gridClass, setGridClass] = useState('grid')
  useEffect(() => {
    if (isIE()) setGridClass('ie-flex')
  })

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
          <section className={`${gridClass} ${classes.content}`}>
            <div role="banner" className={classes.heading}>
              {children[6] /* Encabezado */}
            </div>
            <div role="main" className={`${gridClass} ${classes.main}`}>
              {children[7] /* Contenido */}
            </div>
            <aside className={`${gridClass} ${classes.sidebar}`}>
              {children[8] /* Barra lateral */}
            </aside>
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
