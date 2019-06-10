import React from 'react'

const classes = {
  card: 'editorial-card',
  wrapper: 'editorial-card__wrapper flex flex-col',
  group: 'editorial-card__group uppercase',
  name: 'editorial-card__name block uppercase',
  description: 'flex',
  imageBox: 'flex position-relative items-start',
  image: 'editorial-card__image',
  detailsBox: 'editorial-card__box-details',
  title: 'editorial-card__title block',
}

const OpinionGridEditorialCard = ({ data: story }) => {
  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>
        <h4 className={classes.group}>{story.section}</h4>
        <h2>
          <a className={classes.name} href={story.link}>
            {story.title}
          </a>
        </h2>
        <div className={classes.description}>
          <div className={classes.imageBox}>
            <a href={story.link}>
              <img
                className={classes.image}
                src={story.authorImage}
                alt={story.author}
              />
            </a>
          </div>
          <div className={classes.detailsBox}>
            <p className={classes.title}>{story.subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridEditorialCard
