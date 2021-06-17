import React from 'react'
import { ArcSite } from 'types/fusion'

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

const StorySidebarContinueLayout: React.FC<{
  children: React.ReactNode[]
  index: number
  arcSite: ArcSite
}> = ({ children = [], index, arcSite }) => (
  <>
    <div className={classes.layout}>
      <div className={`${classes.lateral} ${classes.lateralL}`}>
        <div
          id={`gpt_laterall_${index + 1}`}
          data-ads-name={`/28253241/${arcSite}/web/post/snota/laterall"`}
          data-ads-dimensions="[[120,600],[160,600]]"
          data-ads-load-first="true"
          data-bloque="1"
          data-prebid-enabled="true"
        />
      </div>
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
      <div className={`${classes.lateral} ${classes.lateralR}`}>
        <div
          id={`gpt_lateralr_${index + 1}`}
          data-ads-name={`/28253241/${arcSite}/web/post/snota/laterall"`}
          data-ads-dimensions="[[120,600],[160,600]]"
          data-ads-load-first="true"
          data-bloque="1"
          data-prebid-enabled="true"
        />
      </div>
    </div>
  </>
)

export default StorySidebarContinueLayout
