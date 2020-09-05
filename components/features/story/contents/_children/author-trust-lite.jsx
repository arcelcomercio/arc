import React from 'react'
import {
  formatDayMonthYearBasic,
  formatDateStory,
} from '../../../../utilities/date-time/dates'
import Image from '../../../../global-components/image'

const classes = {
  author: 'story-contents__author flex ',
  authorInfo: 'story-contents__author-info flex',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorTime: 'story-contents__time',
  authorEmail: 'story-contents__author-email  ',
  authorImage: 'story-contents__author-image',
  authorRole: 'story-contents__author-role',
}

const StoryContentChildAuthorTrustLite = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  updatedDate,
  date,
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
                <Image
                  itemProp="image"
                  src={authorImage}
                  width={57}
                  height={57}
                  title={author}
                  alt={author}
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
          <time dateTime={date}>{date && formatDateStory(date)}</time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorTrustLite
