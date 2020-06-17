import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  container: 'flex flex-col w-full',
  layout: 'flex justify-center',
  contentContainer: 'flex flex-col w-full position-relative',
  content: 'mt-20 mb-20',
  aditional: 'mb-20',
}

/**---------------------------------------------------------------------
 *
 * TODO: Seguramente hay que hacer un cambio en el top de los zocalos
 * para este layout
 * 
  ----------------------------------------------------------------------*/

const WideContentSpecialDefault = ({ children = [] }) => {
  return (
    <div className={classes.container}>
      {children[0] /* Publicidad Top */}
      {children[1] /* Barra de navegación */}
      {children[2] /* Cabecera de página */}
      <div className={classes.layout}>
        <div className={classes.contentContainer}>
          {children[3] /* Encabezado */}
          <div role="main" className={classes.content}>
            {children[4] /* Contenido */}
          </div>
          {children[5] && (
            <section className={classes.aditional}>{children[5]}</section>
          ) /* Contenido adicional */}
        </div>
      </div>
      {children[6] /* Pie de página */}
    </div>
  )
}

WideContentSpecialDefault.propTypes = {
  children: PropTypes.node,
}

WideContentSpecialDefault.sections = [
  'Publicidad Top',
  'Barra de navegación',
  'Cabecera de página',
  'Encabezado',
  'Contenido',
  'Contenido adicional',
  'Pie de página',
]

export default WideContentSpecialDefault
