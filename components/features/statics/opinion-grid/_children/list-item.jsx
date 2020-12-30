import * as React from 'react'

import Image from '../../../../global-components/image'
import { formatDateLocalTimeZone } from '../../../../utilities/date-time/dates'

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
  date,
  websiteLink,
  author,
  authorLink,
  title,
  multimedia,
  defaultAuthorImage,
  authorImage,
}) => {
  const existImageAuthor = authorImage.includes('author.png')

  return (
    <div role="listitem" className={classes.authorItem}>
      <div className={classes.wrapper}>
        <div className={classes.social}>
          <time className={classes.date} dateTime={date}>
            {formatDateLocalTimeZone(date)}
          </time>
        </div>
        <div className={classes.content}>
          {existImageAuthor ? (
            <i className={classes.defaultImage} />
          ) : (
            <figure className={classes.imageBox}>
              <a itemProp="url" href={websiteLink}>
                <Image
                  src={authorImage}
                  width={70}
                  height={70}
                  placeholder={defaultAuthorImage}
                  alt={author}
                  className={classes.image}
                  loading="lazy"
                />
              </a>
            </figure>
          )}

          <div className={classes.descBox}>
            <time className={classes.date} dateTime={date}>
              {formatDateLocalTimeZone(date)}
            </time>
            <h2 itemProp="name">
              <a itemProp="url" href={authorLink} className={classes.name}>
                {author}
              </a>
            </h2>
            <p itemProp="description">
              <a itemProp="url" href={websiteLink} className={classes.subtitle}>
                {title}
              </a>
            </p>
          </div>
          <figure className={classes.pictureWrapper}>
            <a itemProp="url" href={websiteLink}>
              <Image
                src={multimedia}
                width={118}
                height={72}
                alt={title}
                className={classes.pictureNota}
                loading="lazy"
              />
            </a>
          </figure>
        </div>
      </div>
    </div>
  )
}

export default React.memo(OpinionGridListItem)
