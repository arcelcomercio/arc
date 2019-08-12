import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { isIE } from '../utilities/helpers'

const classes = {
  container: 'flex flex-col w-full',
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col content-layout-container w-full',
  content:
    'grid--content content-layout grid--col-1 grid--col-2 grid--col-3 mt-20 mb-20',
  aditional: 'mb-20',
  zocalo: 'ads__zocalo',
}

/**---------------------------------------------------------------------
 *
 * TODO: Seguramente hay que hacer un cambio en el top de los zocalos
 * para este layout
 * 
  ----------------------------------------------------------------------*/

const WideNavGridLayout = ({ children = [] }) => {
  const [gridClass, setGridClass] = useState('grid')
  useEffect(() => {
    if (isIE()) setGridClass('ie-flex')
  })
  return (
    <div className={classes.container}>
      {children[0] /* Publicidad Top */}
      {children[1] /* Barra de navegación */}
      {children[2] /* Cabecera de página */}
      <div className={classes.layout}>
        <div className={classes.zocalo}>
          {children[3] /* Zocalo izquierda */}
        </div>
        <div className={classes.contentContainer}>
          {children[4] /* Encabezado */}
          <div role="main" className={`${gridClass} ${classes.content}`}>
            {children[5] /* Contenido */}
          </div>
          {children[6] && (
            <section className={classes.aditional}>{children[7]}</section>
          ) /* Contenido adicional */}
        </div>
        <div className={classes.zocalo}>{children[8] /* Zocalo derecha */}</div>
      </div>
      {children[9] /* Pie de página */}
    </div>
  )
}

WideNavGridLayout.propTypes = {
  children: PropTypes.node,
}

WideNavGridLayout.sections = [
  'Publicidad Top',
  'Barra de navegación',
  'Cabecera de página',
  'Zocalo izquierda',
  'Encabezado',
  'Contenido',
  'Contenido adicional',
  'Zocalo derecha',
  'Pie de página',
]

export default WideNavGridLayout
