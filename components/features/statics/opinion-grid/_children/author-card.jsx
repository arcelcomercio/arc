import React from 'react'

const classes = {
  card: 'author-card',
  wrapper: 'author-card__wrapper flex position-relative',
  imageBox: 'author-card__box-image flex items-start position-relative',
  image: 'author-card__image',
  detailsBox: 'author-card__box-details full-width',
  name: 'author-card__name block',
  group: 'author-card__group uppercase',
  title: 'author-card__title uppercase block',
}

const OpinionGridAuthorCard = ({ data: story }) => {
  return (
    <div className={classes.card}>
      <div className={classes.wrapper}>
        <div className={classes.imageBox}>
          <img
            className={classes.image}
            src={story.authorImage}
            alt={story.author}
          />
        </div>
        <div className={classes.detailsBox}>
          <h2>
            <a className={classes.name} href={story.authorLink}>
              {story.author}
            </a>
          </h2>
          <p className={classes.group}>{story.section}</p>
          <h2>
            <a className={classes.title} href={story.link}>
              {story.title}
            </a>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridAuthorCard
