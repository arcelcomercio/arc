import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  container: 'f f-col w-full',
  layout: 'f just-center',
  contentContainer: 'st-sidebar__container f f-col w-full pos-rel',
  content: 'st-sidebar__content f mt-20 mb-20',
  main: 'st-sidebar__main',
  sidebar: 'st-sidebar__side',
  aditional: 'mb-20',
  lateral: 'ad-lateral ad-lateral--wide',
  lateralL: 'ad-lateral--l',
  lateralR: 'ad-lateral--r',
}

/**---------------------------------------------------------------------
 *
 * TODO: Seguramente hay que hacer un cambio en el top de los zocalos
 * para este layout
 * 
  ----------------------------------------------------------------------*/

const WideNavGridSidebar = ({ children = [] }) => {
  return (
    <div className={classes.container}>
      {children[1] /* Publicidad Top */}
      {children[2] /* Barra de navegación */}
      {children[3] /* Cabecera de página */}
      <div className={classes.layout}>
        <div className={`${classes.lateral} ${classes.lateralL}`}>
          {children[0] /* lateral izquierda */}
        </div>
        <div className={classes.contentContainer}>
          {children[4] /* Encabezado */}
          <div className={classes.content}>
            <div role="main" className={classes.main}>
              {children[5] /* Contenido */}
            </div>
            <aside className={classes.sidebar}>
              {children[6] /* Barra lateral */}
            </aside>
          </div>
          {children[7] && (
            <section className={classes.aditional}>{children[7]}</section>
          ) /* Contenido adicional */}
        </div>
        <div className={`${classes.lateral} ${classes.lateralR}`}>
          {children[9] /* lateral derecha */}
        </div>
      </div>
      {children[8] /* Pie de página */}
    </div>
  )
}

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
