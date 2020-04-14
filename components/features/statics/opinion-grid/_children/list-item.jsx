import React from 'react'
import { formatDateLocalTimeZone } from '../../../../utilities/helpers'

const classes = {
  authorItem: 'author-item',
  wrapper:
    'author-item__wrapper w-full flex justify-center p-20 m-0 mx-auto border-b-1 border-solid border-gray',
  social: 'author-item__social hidden md:flex md:pt-10',
  date: 'author-item__date text-xs hidden md:block',
  content: 'author-item__content flex w-full items-start',
  defaultImage: 'author-item__box-image-default icon-marca',
  imageBox:
    'author-item__box-image flex flex-grow-0 flex-shrink-0 bg-base-300 rounded md:rounded-none',
  image:
    'author-item__image object-cover rounded md:rounded-none md:w-full md:h-full',
  descBox: 'author-item__information ml-20',
  name:
    'author-item__name block secondary-font font-bold pt-5 mb-10 title-sm text-gray-300',
  subtitle: 'author-item__subtitle block secondary-font text-xs text-gray-300',
  pictureNota: 'author-item__picture-nota',
  pictureWrapper: 'author-item__picture-wrapper',
}

const OpinionGridListItem = ({
  data: story,
  isAdmin,
  defaultAuthorImage,
  authorImage,
}) => {
  const existImageAuthor = authorImage.includes('author.png')

  return (
    <div role="listitem" className={classes.authorItem}>
      <div className={classes.wrapper}>
        <div className={classes.social}>
          <time className={classes.date} dateTime={story.date}>
            {formatDateLocalTimeZone(story.date)}
          </time>
        </div>
        <div className={classes.content}>
          {existImageAuthor ? (
            <i className={classes.defaultImage} />
          ) : (
            <figure className={classes.imageBox}>
              <a href={story.websiteLink}>
                <img
                  src={isAdmin ? authorImage : defaultAuthorImage}
                  data-src={authorImage}
                  className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                  alt={story.author}
                />
              </a>
            </figure>
          )}

          <div className={classes.descBox}>
            <time className={classes.date} dateTime={story.date}>
              {formatDateLocalTimeZone(story.date)}
            </time>
            <h2>
              <a href={story.authorLink} className={classes.name}>
                {story.author}
              </a>
            </h2>
            <p>
              <a href={story.websiteLink} className={classes.subtitle}>
                {story.title}
              </a>
            </p>
          </div>
          <figure className={classes.pictureWrapper}>
            <a href={story.websiteLink}>
              <picture>
                <img
                  className={`${isAdmin ? '' : 'lazy'} ${classes.pictureNota}`}
                  alt={story.title}
                  src={
                    isAdmin
                      ? story.multimediaLandscapeXS
                      : story.multimediaLazyDefault
                  }
                  data-src={story.multimediaLandscapeXS}
                />
              </picture>
            </a>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default OpinionGridListItem
