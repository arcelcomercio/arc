import React from 'react'

import { createMarkup } from '../../../../utilities/helpers'
import { SITE_GESTION } from '../../../../utilities/constants/sitenames'

const classes = {
  container: 'flex flex-col justify-start p-20',
  header:
    'linked-site__header flex justify-between items-center border-solid border-black mb-15 pb-10',
  headerText:
    'linked-site__h-text text-black font-bold secondary-font title-xs uppercase',
  headerSiteText: 'linked-site__subtitle secondary-font text-md',
  headerSite: 'font-bold',
  list: 'flex flex-col md:flex-row md:flex-wrap md:justify-between',
  listItem: 'linked-site__item flex mb-15 md:flex-col',
  listItemTitle:
    'linked-site__title-link overflow-hidden block text-black font-bold secondary-font line-h-sm title-xs',
  image: 'linked-site__image object-cover',
  imageContainer: 'link-site__image-container position-relative',
  iconContainer: 'linked-site__icon-container mr-5 mt-5',
  iconImagePremium: 'linked-site__icon-premium',
}

const StoriesListLinkedBySiteChild = ({
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
                <picture className="block mr-10 md:mr-0 md:mb-5">
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
            </a>
          )
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListLinkedBySiteChild
