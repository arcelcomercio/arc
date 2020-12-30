import * as React from 'react'

import {
  SITE_DEPOR,
  SITE_GESTION,
  SITE_TROME,
} from '../../../../../utilities/constants/sitenames'
import ListItem from './list-item'

const classes = {
  container: 'link-site f f-col',
  header: 'link-site__header f alg-center just-between',
  headerText: 'link-site__h-text uppercase',
  headerSiteText: 'link-site__subtitle',
  headerSite: 'link-site__site',

}

const StoriesListRecommenderBySiteChild = ({
  siteName,
  stories,
  isTargetBlank,
  titleField,
  subtitleField,
  logo = '',
  arcSite = '',
}) => {
  const isGestion = arcSite === SITE_GESTION
  const isDepor = arcSite === SITE_DEPOR
  const isTrome = arcSite === SITE_TROME
  const siteAllowed = () => {
    if (isDepor) return true
    if (isTrome) return true
    return false
  }
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <p itemProp="description" className={classes.headerText}>
          {titleField || 'NO TE PIERDAS'}
        </p>
        <div>
          {subtitleField ? (
            <div
              className={classes.headerSiteText}
              dangerouslySetInnerHTML={{ __html: subtitleField }}
            />
          ) : (
            <h3 itemProp="name" className={classes.headerSiteText}>
              Contenido de{' '}
              <span className={classes.headerSite}>{siteName}</span>
            </h3>
          )}
        </div>
      </div>
      <div role="navigation" className={classes.list}>
        {stories.map(
          ({
            title,
            websiteLink,
            multimedia,
            isPremium = false,
          }) => <ListItem
            title={title}
            websiteLink={websiteLink}
            multimedia={multimedia}
            logo={logo}
            siteName={siteName}
            siteAllowed={siteAllowed()}
            isTargetBlank={isTargetBlank}
            isPremium={isPremium}
            isGestion={isGestion}
          />
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListRecommenderBySiteChild
