import React from 'react'

const classes = {
  container: 'flex flex-col justify-start p-20',
  header:
    'linked-brand__header flex justify-between items-center border-solid border-black mb-15 pb-10',
  headerText: 'uppercase',
  headerBrand: '',
  list: 'flex flex-col md:flex-row md:flex-wrap md:justify-between',
  listItem: 'linked-brand__item flex mb-15 md:flex-col',
  image: 'linked-brand__image object-cover',
}

const StoriesListLinkedByBrandChild = ({ isAdmin, stories }) => {
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <p className="text-black font-bold secondary-font title-xs">
          NO TE PIERDAS
        </p>
        <h3 className="secondary-font text-md">Contenido de Mag.</h3>
      </div>
      <div role="list" className={classes.list}>
        {stories.map(
          ({
            title,
            websiteLink,
            multimediaLazyDefault,
            multimediaSquareS,
            multimediaLandscapeS,
          }) => (
            <article
              role="listitem"
              className={classes.listItem}
              key={websiteLink}>
              <a href={websiteLink} className="mr-10 md:mr-0 md:mb-5">
                <picture>
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
              </a>
              <h2>
                <a
                  className="linked-brand__title-link overflow-hidden block text-black font-bold secondary-font line-h-sm title-xs"
                  href={websiteLink}>
                  {title}
                </a>
              </h2>
            </article>
          )
        )}
      </div>
    </section>
  )
}

// TODO: Verificar si ayuda React.memo
export default StoriesListLinkedByBrandChild
