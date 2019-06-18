import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

const classes = {
  authorItem: 'author-item',
  wrapper:
    'author-item__wrapper w-full flex justify-center p-20 m-0 mx-auto border-b-1 boder-solid',
  social: 'author-item__social hidden md:flex md:pt-10',
  date: 'author-item__date text-xs hidden md:block',
  content: 'author-item__content flex w-full items-start',
  imageBox: 'author-item__box-image flex flex-grow-0 flex-shrink-0 rounded',
  image: 'author-item__image object-cover rounded md:w-full md:h-full',
  descBox: 'ml-20',
  name:
    'author-item__name block secondary-font font-bold pt-5 mb-10 title-sm text-gray-300',
  subtitle: 'author-item__subtitle block secondary-font text-xs text-gray-300',
}

const OpinionGridListItem = ({ data: story }) => {
  return (
    <div role="listitem" className={classes.authorItem}>
      <div className={classes.wrapper}>
        <div className={classes.social}>
          <time className={classes.date} dateTime={story.date}>
            {formatDate(story.date)}
          </time>
        </div>
        <div className={classes.content}>
          <figure className={classes.imageBox}>
            <a href={story.link}>
              <img
                src={story.authorImage}
                className={classes.image}
                alt={story.author}
              />
            </a>
          </figure>
          <div className={classes.descBox}>
            <time className={classes.date} dateTime={story.date}>
              {formatDate(story.date)}
            </time>
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
