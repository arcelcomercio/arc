import React from 'react'
import PropTypes from 'prop-types'

// TODO: WIP

const classes = {
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col content-layout-container w-full position-relative',
  aditional: 'mb-20',
  zocalo: 'ads__zocalo',
}

const AmpLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.zocalo}>{children[0] /* Zocalo izquierda */}</div>
      <div className={classes.contentContainer}>
        {children[1] /* Publicidad Top */}
        {children[2] /* Barra de navegación */}
        {children[3] /* Cabecera de página */}
        {children[4] && (
          <section className={classes.aditional}>{children[4]}</section>
        ) /* Contenido adicional */}
        <div role="main">{children[5] /* Contenido */}</div>
        {children[6] && (
          <section className={classes.aditional}>{children[6]}</section>
        ) /* Contenido adicional */}
        {children[7] /* Pie de página */}
      </div>
      <div className={classes.zocalo}>{children[8] /* Zocalo derecha */}</div>
    </div>
  )
}

AmpLayout.propTypes = {
  children: PropTypes.node,
}

AmpLayout.sections = [
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

export default AmpLayout
