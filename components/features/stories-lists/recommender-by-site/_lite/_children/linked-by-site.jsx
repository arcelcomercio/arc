import React from 'react'

import { createMarkup } from '../../../../../utilities/helpers'
import {
  SITE_DEPOR,
  SITE_GESTION,
} from '../../../../../utilities/constants/sitenames'

const classes = {
  container: 'link-site f f-col',
  header: 'link-site__header f alg-center just-between',
  headerText: 'link-site__h-text uppercase',
  headerSiteText: 'link-site__subtitle',
  headerSite: 'link-site__site',
  list: 'link-site__list f f-col',
  listItem: 'link-site__item f mb-15',
  picture: 'link-site__pic',
  listItemTitle: 'link-site__title-link oflow-h ',
  image: 'link-site__image',
  sitename: 'link-site__sitename',
  imageContainer: 'link-site__image-container position-relative',
  iconContainer: 'link-site__icon-container mr-5 mt-5',
  iconImagePremium: 'link-site__icon-premium',
}

const StoriesListRecommenderBySiteChild = ({
  isAdmin,
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
              dangerouslySetInnerHTML={createMarkup(subtitleField)}
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
            multimediaLazyDefault,
            multimediaSquareS,
            multimediaLandscapeS,
            isPremium = false,
          }) => (
            <a
              itemProp="url"
              className={classes.listItem}
              key={websiteLink}
              href={websiteLink}
              {...isTargetBlank}>
              <div className={classes.imageContainer}>
                {isPremium && isGestion && (
                  <div className={classes.iconContainer}>
                    <img
                      className={classes.iconImagePremium}
                      src={logo}
                      alt="premium"
                    />
                  </div>
                )}
                <picture className={classes.picture}>
                  <source
                    className={isAdmin ? '' : 'lazy'}
                    media="(max-width: 639px)"
                    type="image/jpeg"
                    srcSet={isAdmin ? multimediaSquareS : multimediaLazyDefault}
                    data-srcset={multimediaSquareS}
                  />
                  <img
                    src={isAdmin ? multimediaLandscapeS : multimediaLazyDefault}
                    data-src={multimediaLandscapeS}
                    className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                    alt={title}
                  />
                </picture>
              </div>

              <h2 itemProp="name" className={classes.listItemTitle}>
                {title}
              </h2>
              {isDepor && <span className={classes.sitename}>{siteName}</span>}
            </a>
          )
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListRecommenderBySiteChild
