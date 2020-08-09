import React from 'react'
import { formatDateStory } from '../../../../utilities/date-time/dates'

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

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  updatedDate,
  authorEmail,
  primarySection = '',
}) => {
  // const displayLoc = locality === '' ? 'Lima' : locality
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
          <time dateTime={updatedDate}>
            {updatedDate && formatDateStory(updatedDate)}
          </time>
        </div>
      </div>
    </>
  )
}

export default StoryContentChildAuthorLite
