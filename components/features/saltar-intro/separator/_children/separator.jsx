import React from 'react'

const classes = {
  container: 'saltar-intro-separator__container',
  list: 'saltar-intro-separator__list flex',
  boxSeeMore: 'saltar-intro-separator__box-see-more',
  seeMore: 'saltar-intro-separator__see-more',
  title: 'saltar-intro-separator__box-title',
  titleLink: 'saltar-intro-separator__title',
  titleReversing: 'saltar-intro-separator__title--reversing',
  item: 'saltar-intro-separator__box-item',
  itemLink: 'saltar-intro-separator__item-link',
  figure: 'saltar-intro-separator__figure',
  image: 'saltar-intro-separator__image',
  section: 'saltar-intro-separator__section',
  author: 'saltar-intro-separator__author',
  content: 'saltar-intro-separator__content',
}
export default ({
  isAdmin,
  seeMoreLink,
  modeStreaming = false,
  data: {
    items,
    // arcSite,
    titleSeparator = '',
    titleLink = '/',
  } = {},
}) => (
  <div
    className={`${classes.container} ${
      modeStreaming && `${classes.container}--streaming`
    }`}>
    {!modeStreaming && (
      <h2 itemProp="name" className={classes.title}>
        <a itemProp="url" href={titleLink} className={classes.titleLink}>
          <span className={classes.titleReversing}>{titleSeparator}</span>
        </a>
      </h2>
    )}
    <div className={classes.boxSeeMore}>
      <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
        Ver más
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 28.44 26.27">
          <path
            d="M24.79,14.26c0,5.59-4.55,10.09-10.09,10.09c-5.59,0-10.09-4.49-10.09-10.09c0-5.54,4.49-10.03,10.09-10.03
	C20.24,4.23,24.79,8.72,24.79,14.26z M22.18,14.26l-5.59-5.56c-0.61-0.61-1.51-0.61-2.14,0c-0.29,0.26-0.41,0.67-0.41,1.04
	c0,0.41,0.12,0.78,0.41,1.1c0,0,0.96,0.96,1.94,1.94H8.7c-0.81,0-1.51,0.64-1.51,1.48c0,0.84,0.7,1.51,1.51,1.51h7.68
	c-0.99,1.04-1.94,1.94-1.94,1.94c-0.29,0.32-0.41,0.72-0.41,1.1c0,0.41,0.12,0.75,0.41,1.07c0.64,0.61,1.54,0.61,2.14,0L22.18,14.26
	z"
          />
        </svg>
      </a>
    </div>
    <div role="list" className={classes.list}>
      {items &&
        items.map((el) => {
          const { embed: { config: { plataform, chapter } = {} } = {} } =
            el.dataSaltarIntro || {}
          const params = {
            title: el.title,
            link: el.websiteLink,
            section: el.primarySection,
            sectionLink: el.primarySectionLink,
            imageUrl: el.multimediaLandscapeS,
            lazyImage: el.multimediaLazyDefault,
            mediaIcon: el.multimediaType,
            author: el.author,
            isAdmin,
          }
          const category = modeStreaming
            ? plataform || params.section
            : chapter || params.section
          return (
            <article className={classes.item}>
              <figure className={classes.figure}>
                <a
                  itemProp="url"
                  href={params.link}
                  className={classes.itemLink}>
                  <img
                    src={isAdmin ? params.imageUrl : params.lazyImage}
                    data-src={params.imageUrl}
                    alt={params.title}
                    className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                  />
                </a>
              </figure>
              <a className={classes.section} href={params.sectionLink}>
                {category}
              </a>
              <a className={classes.content} href={params.link}>
                {params.title}
              </a>
              <div className={classes.author}>{params.author}</div>
            </article>
          )
        })}
    </div>
  </div>
)
