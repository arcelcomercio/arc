import * as React from 'react'

import { SITE_GESTION } from '../../../../utilities/constants/sitenames'

import ListItem from './list-item'

const classes = {
  container: 'flex flex-col justify-start p-20',
  header:
    'linked-site__header flex justify-between items-center border-solid border-black mb-15 pb-10',
  headerText:
    'linked-site__h-text text-black font-bold secondary-font title-xs uppercase',
  headerSiteText: 'linked-site__subtitle secondary-font text-md',
  headerSite: 'font-bold',
  list: 'flex flex-col md:flex-row md:flex-wrap md:justify-between',
}

const StoriesListLinkedBySiteChild = ({
  siteName,
  stories,
  isTargetBlank,
  titleField,
  subtitleField,
  logo = '',
  arcSite = '',
}) => {
  const isGestion = arcSite === SITE_GESTION
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
          ({ title, websiteLink, multimedia, isPremium = false }) => (
            <ListItem
              title={title}
              websiteLink={websiteLink}
              multimedia={multimedia}
              logo={logo}
              isTargetBlank={isTargetBlank}
              isPremium={isPremium}
              isGestion={isGestion}
            />
          )
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListLinkedBySiteChild
