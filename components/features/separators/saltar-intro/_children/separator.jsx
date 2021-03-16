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
}) => {
  // console.log('============Data', data)
  return (
    <div
      className={`${classes.container} ${modeStreaming &&
        `${classes.container}--streaming`}`}>
      {!modeStreaming && (
        <h2 itemProp="name" className={classes.title}>
          <a itemProp="url" href={titleLink} className={classes.titleLink}>
            <span className={classes.titleReversing}>{titleSeparator}</span>
          </a>
        </h2>
      )}
      <div className={classes.boxSeeMore}>
        <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
          Ver más {`->`}
        </a>
      </div>
      <div role="list" className={classes.list}>
        {items &&
          items.map(el => {
            const params = {
              title: el.title,
              link: el.websiteLink,
              section: el.primarySection,
              sectionLink: el.primarySectionLink,
              imageUrl: el.multimediaLandscapeS,
              lazyImage: el.multimediaLazyDefault,
              mediaIcon: el.multimediaType,
              isAdmin,
            }
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
                  {params.section}
                </a>
                <a className={classes.content} href={params.link}>
                  {params.title}
                </a>
                <div className={classes.author}>apellidos y nombres</div>
              </article>
            )
          })}
      </div>
    </div>
  )
}
