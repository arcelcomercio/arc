import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

const classes = {
  authorItem: 'author-item',
  wrapper: 'author-item__wrapper full-width flex flex--justify-center',
  social: 'author-item__social',
  date: 'author-item__date',
  content: 'author-item__content flex full-width flex--align-start',
  imageBox: 'author-item__box-image flex',
  image: 'author-item__image',
  descBox: 'author-item__box-desc',
  name: 'author-item__name block',
  subtitle: 'author-item__subtitle block',
}

const OpinionGridListItem = ({ data: story }) => {
  return (
    <div className={classes.authorItem}>
      <div className={classes.wrapper}>
        <div className={classes.social}>
          <span className={`${classes.date} mobile`}>
            {formatDate(story.date)}
          </span>
        </div>
        <div className={classes.content}>
          <div className={classes.imageBox}>
            <a href={story.link} className={classes.image}>
              <img src={story.authorImage} alt={story.author} />
            </a>
          </div>
          <div className={classes.descBox}>
            <span className={classes.date}>{formatDate(story.date)}</span>
            <h2>
              <a href={story.authorLink} className={classes.name}>
                {story.author}
              </a>
            </h2>
            <p>
              <a href={story.link} className={classes.subtitle}>
                {story.title}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridListItem
