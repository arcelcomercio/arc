import React from 'react'

import { createMarkup } from '../../../../../utilities/helpers'

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
}

const StoriesListRecommenderBySiteChild = ({
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
          }) => (
            <a
              itemProp="url"
              className={classes.listItem}
              key={websiteLink}
              href={websiteLink}
              {...isTargetBlank}>
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
export default StoriesListRecommenderBySiteChild
