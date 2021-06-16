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
      <div className={classes.contentContainer}>
        {children[0] && children[0] /*  Barra de navegación */}
        {children[1] && children[1] /*  Barra de navegación */}
        <section className={classes.content}>
          <div role="banner" className={classes.heading}>
            {children[2] && children[2] /* Encabezado */}
            {children[3] && children[3] /* Multimedia */}
          </div>
          <div role="main" className={classes.main}>
            {children[4] && children[4] /* Multimedia */}
            {children[5] && children[5] /* Contenido */}
          </div>
          {children[6] && (
            <aside className={classes.sidebar}>
              {children[6] /* Barra lateral */}
            </aside>
          )}
        </section>
        {children[7] && children[7] /* Pie de página */}
      </div>
    </div>
  </>
)

export default StorySidebarContinueLayout
