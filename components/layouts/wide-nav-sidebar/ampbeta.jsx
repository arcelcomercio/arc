import PropTypes from 'prop-types'
import React from 'react'

const classes = {
  container: 'flex flex-col w-full',
  layout: 'flex justify-center',
  contentContainer:
    'flex flex-col content-layout-container w-full position-relative',
  content: 'content-sidebar flex mt-20 mb-20',
  main: 'content-sidebar__left',
  sidebar: 'content-sidebar__right',
  aditional: 'mb-20',
  zocalo: 'ads__zocalo ads__zocalo--wide-nav',
  zocaloL: 'ads__zocalo--l',
  zocaloR: 'ads__zocalo--r',
}

/**---------------------------------------------------------------------
 *
 * TODO: Seguramente hay que hacer un cambio en el top de los zocalos
 * para este layout
 * 
  ----------------------------------------------------------------------*/

const WideNavGridSidebar = ({ children = [] }) => (
  <div className={classes.container}>
    {children[1] /* Publicidad Top */}
    {children[2] /* Barra de navegación */}
    {children[3] /* Cabecera de página */}
    <div className={classes.layout}>
      <div className={classes.contentContainer}>
        {children[4] /* Encabezado */}
        <div className={classes.content}>
          <div role="main" className={classes.main}>
            {children[5] /* Contenido */}
          </div>
        </div>
      </div>
    </div>
    {children[8] /* Pie de página */}
  </div>
)

WideNavGridSidebar.propTypes = {
  children: PropTypes.node,
}

WideNavGridSidebar.sections = [
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

export default WideNavGridSidebar
