import React from 'react'
import {
  formatDayMonthYearBasic,
  formatDateStory,
} from '../../../../utilities/date-time/dates'

const classes = {
  author:
    'story-content__author flex justify-between pt-30 mb-20 flex-col md:flex-row',
  authorInfo: 'story-content__author-info flex',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorDate:
    'story-content__date flex items-center secondary-font text-md text-gray-200 line-h-sm',
  authorTime: 'story-content__time',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
  authorImage: 'story-content__author-image',
  authorRole: 'story-content__author-role',
}

const StoryContentChildAuthorTrust = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  updatedDate,
  locality,
  authorEmail,
  primarySection = '',
}) => {
  const displayLoc = locality === '' ? 'Lima' : locality
  return (
    <>
      <div className={classes.author}>
        {primarySection !== 'Columnistas' && (
          <div className={classes.authorInfo}>
            <div>
              {authorImage && (
                <img
                  itemProp="image"
                  alt={author}
                  title={author}
                  src={authorImage}
                  className={classes.authorImage}
                />
              )}
            </div>
            <div>
              {author && (
                <a
                  itemProp="url"
                  href={authorLink}
                  className={classes.authorNameLink}>
                  {author}
                </a>
              )}
              {authorRole && (
                <p itemProp="name" className={classes.authorRole}>
                  {' '}
                  {authorRole}{' '}
                </p>
              )}
              {authorEmail && (
                <p itemProp="description" className={classes.authorEmail}>
                  {' '}
                  {authorEmail}{' '}
                </p>
              )}
            </div>
          </div>
        )}
        <div className={classes.authorDate}>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate &&
              `${displayLoc && `${displayLoc}, `} ${formatDayMonthYearBasic(
                updatedDate,
                false,
                true
              )}`}
          </time>
          <time className={classes.authorTime} dateTime={updatedDate}>
            {updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorTrust
