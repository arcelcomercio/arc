import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'flex justify-center',
  contentContainer:
    'flex flex-col content-layout-container w-full position-relative bg-container',
  aditional: 'mb-20',
  zocalo: 'ads__zocalo',
  zocaloL: 'ads__zocalo--l',
  zocaloR: 'ads__zocalo--r',
}

const DefaultLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={`${classes.zocalo} ${classes.zocaloL}`}>
        {children[0] /* Zocalo izquierda */}
      </div>
      <div className={classes.contentContainer}>
        {children[1] /* Publicidad Top */}
        {children[2] /* Barra de navegación */}
        {children[3] /* Cabecera de página */}
        {children[4] /* Encabezado */}
        <div role="main">{children[5] /* Contenido */}</div>
        {children[6] && (
          <section className={classes.aditional}>{children[6]}</section>
        ) /* Contenido adicional */}
        {children[7] /* Pie de página */}
      </div>
      <div className={`${classes.zocalo} ${classes.zocaloR}`}>
        {children[8] /* Zocalo derecha */}
      </div>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

DefaultLayout.sections = [
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

export default DefaultLayout
