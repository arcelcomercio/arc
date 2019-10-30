import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { isIE } from '../utilities/helpers'

const classes = {
  container: 'flex flex-col w-full',
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col content-layout-container w-full position-relative',
  content:
    'grid--content content-layout grid--col-1 grid--col-2 grid--col-3 mt-20 mb-20',
  aditional: 'mb-20',
  zocalo: 'ads__zocalo ads__zocalo--wide-nav',
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
  }, [])
  return (
    <div className={classes.container}>
      {children[1] /* Publicidad Top */}
      {children[2] /* Barra de navegación */}
      {children[3] /* Cabecera de página */}
      <div className={classes.layout}>
        <div className={classes.zocalo}>
          {children[0] /* Zocalo izquierda */}
        </div>
        <div className={classes.contentContainer}>
          {children[4] /* Encabezado */}
          <div role="main" className={`${gridClass} ${classes.content}`}>
            {children[5] /* Contenido */}
          </div>
          {children[6] && (
            <section className={classes.aditional}>{children[6]}</section>
          ) /* Contenido adicional */}
        </div>
        <div className={classes.zocalo}>{children[8] /* Zocalo derecha */}</div>
      </div>
      {children[7] /* Pie de página */}
    </div>
  )
}

WideNavGridLayout.propTypes = {
  children: PropTypes.node,
}

WideNavGridLayout.sections = [
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

export default WideNavGridLayout
