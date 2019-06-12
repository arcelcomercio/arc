import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

const classes = {
  authorItem: 'author-item',
  wrapper: 'author-item__wrapper w-full flex justify-center p-20 m-0 mx-auto',
  social: 'author-item__social hidden',
  date: 'author-item__date block',
  content: 'author-item__content flex w-full items-start',
  imageBox: 'author-item__box-image flex flex-grow-0 flex-shrink-0',
  image: 'author-item__image object-cover',
  descBox: 'ml-20',
  name: 'author-item__name block secondary-font font-bold pt-5 mb-10',
  subtitle: 'author-item__subtitle block secondary-font',
}

const OpinionGridListItem = ({ data: story }) => {
  return (
    <div role="listitem" className={classes.authorItem}>
      <div className={classes.wrapper}>
        <div className={classes.social}>
          <span className={`${classes.date} mobile`}>
            {formatDate(story.date)}
          </span>
        </div>
        <div className={classes.content}>
          <div className={classes.imageBox}>
            <a href={story.link}>
              <img
                src={story.authorImage}
                className={classes.image}
                alt={story.author}
              />
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
