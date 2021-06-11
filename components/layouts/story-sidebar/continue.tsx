import PropTypes from 'prop-types'
import React from 'react'
import { FC } from 'types/features'
import { AnyObject } from 'types/utils'

const classes = {
  layout: 'f just-center',
  contentContainer: 'st-sidebar__container f f-col w-full pos-rel',
  separator: 'w-full ',
  heading: 'w-full',
  content: 'st-sidebar__content f',
  main: 'st-sidebar__main',
  sidebar: 'st-sidebar__side',
  lateral: 'ad-lateral',
  lateralL: 'ad-lateral--l',
  lateralR: 'ad-lateral--r',
}

const StorySidebarContinueLayout: FC<{ children: AnyObject[] }> = ({
  children = [],
}) => (
  <>
    <div className={classes.layout}>
      <div className={`${classes.lateral} ${classes.lateralL}`}>
        {children[0] /* Lateral izquierdo */}
      </div>
      <div className={classes.contentContainer}>
        {children[1] /*  Barra de navegación */}
        <section className={classes.content}>
          <div role="banner" className={classes.heading}>
            {children[2] /* Encabezado */}
            {children[3] /* Encabezado */}
          </div>
          <div role="main" className={classes.main}>
            {children[4] /* Contenido */}
          </div>
          {children[5] && (
            <aside className={classes.sidebar}>
              {children[5] /* Barra lateral */}
            </aside>
          )}
        </section>
        {children[6] /* Pie de página */}
      </div>
      <div className={`${classes.lateral} ${classes.lateralR}`}>
        {children[7] /* Lateral derecho */}
      </div>
    </div>
  </>
)

StorySidebarContinueLayout.propTypes = {
  children: PropTypes.node,
}

export default StorySidebarContinueLayout
