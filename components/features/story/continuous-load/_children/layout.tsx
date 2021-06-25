import React from 'react'
import { ArcSite } from 'types/fusion'

const classes = {
  layout: 'f just-center pos-rel',
  contentContainer: 'st-sidebar__container f f-col w-full pos-rel',
  separator: 'w-full ',
  heading: 'w-full',
  content: 'st-sidebar__content f',
  main: 'st-sidebar__main',
  sidebar: 'st-sidebar__side',
  lateral: 'ad-lateral',
  lateralL: 'ad-lateral--l ads-lateral-fix',
  lateralR: 'ad-lateral--r ads-lateral-fix',
  adcajaR: 'ads-lateralr',
  adcajaL: 'ads-laterall',
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
          className={classes.adcajaL}
        />
      </div>
      <div className={classes.contentContainer}>
        {children[0] && children[0] /*  Barra de navegación */}
        <section className={classes.content}>
          <div
            id={`gpt_top_${index + 1}`}
            data-ads-name={`/28253241/${arcSite}/web/post/snota/top`}
            data-ads-dimensions="[[1,1],[970,250],[970,90],[728,9]]"
            data-ads-dimensions-m="[[320, 100],  [320, 50],  [300, 100],  [300, 50],  [1, 1]]"
            data-ads-load-first="true"
            data-bloque="1"
            data-prebid-enabled="true"
          />
          {children[1] && children[1] /*  Barra de navegación */}
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
              <div
                id={`gpt_caja1_${index + 1}`}
                data-ads-name={`/28253241/${arcSite}/web/post/snota/caja1`}
                data-ads-dimensions="[[300, 50], [320, 100], [300, 600], [320, 50], [300, 250], [300, 100]]"
                data-ads-dimensions-m=""
                data-ads-load-first="true"
                data-bloque="1"
                data-prebid-enabled="true"
                data-prebid-dimensions="[[300,250],[300,600]]"
              />
              {children[6] /* Barra lateral */}
              <div
                id={`gpt_caja2_${index + 1}`}
                data-ads-name={`/28253241/${arcSite}/web/post/snota/caja2`}
                data-ads-dimensions="[[300, 600] , [300, 250] , [320, 100], [300, 100]]"
                data-ads-dimensions-m=""
                data-bloque="4"
                data-prebid-enabled="true"
              />
            </aside>
          )}
        </section>
        {children[7] && children[7] /* Pie de página */}
      </div>
      <div className={`${classes.lateral} ${classes.lateralR}`}>
        <div
          id={`gpt_lateralr_${index + 1}`}
          data-ads-name={`/28253241/${arcSite}/web/post/snota/lateralr"`}
          data-ads-dimensions="[[120,600],[160,600]]"
          data-ads-load-first="true"
          data-bloque="1"
          data-prebid-enabled="true"
          className={classes.adcajaR}
        />
      </div>
    </div>
  </>
)

export default StorySidebarContinueLayout
