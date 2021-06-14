import React from 'react'

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

const StorySidebarContinueLayout: React.FC<{ children: React.ReactNode[] }> = ({
  children = [],
}) => (
  <>
    <div className={classes.layout}>
      <div className={`${classes.lateral} ${classes.lateralL}`}>
        {children[0] && children[0] /* Lateral izquierdo */}
      </div>
      <div className={classes.contentContainer}>
        {children[1] && children[1] /*  Barra de navegación */}
        {children[2] && children[2] /*  Barra de navegación */}
        <section className={classes.content}>
          <div role="banner" className={classes.heading}>
            {children[3] && children[3] /* Encabezado */}
            {children[4] && children[4] /* Multimedia */}
          </div>
          <div role="main" className={classes.main}>
            {children[5] && children[5] /* Multimedia */}

            {children[6] && children[6] /* Contenido */}
          </div>
          {children[7] && (
            <aside className={classes.sidebar}>
              {children[7] /* Barra lateral */}
            </aside>
          )}
        </section>
        {children[8] && children[8] /* Pie de página */}
      </div>
      <div className={`${classes.lateral} ${classes.lateralR}`}>
        {children[9] && children[9] /* Lateral derecho */}
      </div>
    </div>
  </>
)

export default StorySidebarContinueLayout
