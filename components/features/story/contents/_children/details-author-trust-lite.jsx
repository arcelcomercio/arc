import React from 'react'

const classes = {
  authorInfo: 'story-contents__author-info flex',
  authorNameLink: 'story-contents__author-link ',
  authorEmail: 'story-contents__author-email  ',
  authorImage: 'story-contents__author-image',
  authorRole: 'story-contents__author-role',
}

const StoryContentChildDetailsAuthorTrustLite = ({
  author,
  authorLink,
  authorImgSmall,
  authorRole,
  authorEmail,
}) => {
  return (
    <>
      <div className={classes.authorInfo}>
        <div>
          {authorImgSmall && (
            <img
              itemProp="image"
              alt={author}
              title={author}
              src={authorImgSmall}
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
    </>
  )
}

export default StoryContentChildDetailsAuthorTrustLite
