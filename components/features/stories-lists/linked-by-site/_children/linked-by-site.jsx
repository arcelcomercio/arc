import React from 'react'

import { createMarkup } from '../../../../utilities/helpers'

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
}

const StoriesListLinkedBySiteChild = ({
  isAdmin,
  siteName,
  stories,
  isTargetBlank,
  titleField,
  subtitleField,
}) => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <p className={classes.headerText}>{titleField || 'NO TE PIERDAS'}</p>
        <div>
          {subtitleField ? (
            <div
              className={classes.headerSiteText}
              dangerouslySetInnerHTML={createMarkup(subtitleField)}
            />
          ) : (
            <h3 className={classes.headerSiteText}>
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
          }) => (
            <a
              className={classes.listItem}
              key={websiteLink}
              href={websiteLink}
              {...isTargetBlank}>
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

              <h2 className={classes.listItemTitle}>{title}</h2>
            </a>
          )
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListLinkedBySiteChild
