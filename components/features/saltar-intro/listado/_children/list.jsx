import React from 'react'

import { getActualDate } from '../../../../utilities/date-time/dates'

const classes = {
  container: 'saltar-intro-listado__container',
  trailer: 'saltar-intro-listado--trailer',
  list: 'saltar-intro-listado__list flex',
  item: 'saltar-intro-listado__item flex',
  figure: 'saltar-intro-listado__figure',
  link: 'saltar-intro-listado__link',
  title: 'saltar-intro-listado__title',
  subtitle: 'saltar-intro-listado__subtitle',
  name: 'saltar-intro-listado__name',
  descrip: 'saltar-intro-listado__description',
  date: 'saltar-intro-listado__date',
  dateBorder: 'saltar-intro-listado__date--border',
  box: 'saltar-intro-listado__box flex',
  boxInfo: 'saltar-intro-listado__box-info flex',
  detail: 'saltar-intro-listado__detail flex',
  boxSeeMore: 'saltar-intro-listado__box-see-more',
  seeMore: 'saltar-intro-listado__see-more',
  image: 'saltar-intro-listado__image',
  author: 'saltar-intro-listado__author',
}
export default ({
  isAdmin,
  seeMoreLink,
  infoInterviewed,
  isTrailer,
  data: { items = [] } = {},
}) => (
  <div className={`${classes.container} ${isTrailer ? classes.trailer : ''}`}>
    <div className={classes.list}>
      {items &&
        items.map((el) => {
          const {
            embed: {
              config: {
                interviewed = '-',
                career_interviewed: careerInterviewed = '-',
              } = {},
            } = {},
          } = el.dataSaltarIntro
          const params = {
            title: el.title,
            link: el.websiteLink,
            imageUrl: el.multimediaLandscapeS,
            lazyImage: el.multimediaLazyDefault,
            author: el.author,
            date: el.date,
            subTitle: el.subTitle,
            isAdmin,
          }
          return (
            <>
              <article
                className={
                  infoInterviewed
                    ? `${classes.item} ${classes.dateBorder}`
                    : `${classes.item}`
                }>
                <div className={classes.box}>
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
                  <div className={classes.boxInfo}>
                    {infoInterviewed ? (
                      <>
                        <div className={classes.name}>{interviewed}</div>
                        <div className={classes.descrip}>
                          {careerInterviewed}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className={classes.date}>
                      {getActualDate(params.date)}
                    </div>
                  </div>
                </div>
                <div className={classes.detail}>
                  <a className={classes.title} href={params.link}>
                    {params.title}
                  </a>
                  <a className={classes.subtitle} href={params.link}>
                    {params.subTitle}
                  </a>
                  <div className={classes.author}>{params.author}</div>
                </div>
              </article>
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
