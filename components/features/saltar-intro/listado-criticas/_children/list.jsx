import React from 'react'

const classes = {
  container: 'saltar-intro-listado-criticas__container',
  list: 'saltar-intro-listado-criticas__list flex',
  item: 'saltar-intro-listado-criticas__item',
  figure: 'saltar-intro-listado-criticas__figure',
  link: 'saltar-intro-listado-criticas__link',
  title: 'saltar-intro-listado-criticas__title',
  author: 'saltar-intro-listado-criticas__author',
  section: 'saltar-intro-listado-criticas__section',
  stars: 'saltar-intro-listado-criticas__stars',
  starsColor: 'saltar-intro-listado-criticas__stars--color',
  box: 'saltar-intro-listado-criticas__box',
  line: 'saltar-intro-listado-criticas__line',
  boxSeeMore: 'saltar-intro-listado-criticas__box-see-more',
  seeMore: 'saltar-intro-listado-criticas__see-more',
  image: 'saltar-intro-listado-criticas__image',
}
export default ({ isAdmin, seeMoreLink, data: { items = [] } = {} }) => {
  const getStars = (count = 0, max = 5) => {
    const limitCount = count > 5 ? 5 : parseInt(count)
    const starFull = `<span class="${classes.starsColor}">☆</span>`.repeat(
      limitCount
    )
    const star = '☆'.repeat(max - limitCount)
    return `${starFull}${star}`
  }

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        {items &&
          items.map((el, index) => {
            const { embed: { config: { score = 0, chapter } = {} } = {} } =
              el.dataSaltarIntro || {}
            const params = {
              title: el.title,
              link: el.websiteLink,
              section: el.primarySection,
              sectionLink: el.primarySectionLink,
              imageUrl: el.multimediaLandscapeS,
              lazyImage: el.multimediaLazyDefault,
              author: el.author,
              isAdmin,
            }
            return (
              <>
                <article className={classes.item}>
                  <figure className={classes.figure}>
                    <a
                      itemProp="url"
                      href={params.link}
                      className={classes.link}>
                      <img
                        src={isAdmin ? params.imageUrl : params.lazyImage}
                        data-src={params.imageUrl}
                        alt={params.title}
                        className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                      />
                    </a>
                  </figure>
                  <div className={classes.box}>
                    <a className={classes.section} href={params.sectionLink}>
                      {chapter || params.section}
                    </a>
                    <div
                      className={classes.stars}
                      dangerouslySetInnerHTML={{ __html: getStars(score) }}
                    />
                  </div>
                  <a className={classes.title} href={params.link}>
                    {params.title}
                  </a>
                  <div className={classes.author}>{params.author}</div>
                </article>
                {(index + 1) % 3 === 0 && <div className={classes.line} />}
              </>
            )
          })}
      </div>
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
    </div>
  )
}
