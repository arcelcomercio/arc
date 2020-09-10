import React from 'react'

const classes = {
  authorInfo: 'story-content__author-info flex',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
  authorImage: 'story-content__author-image',
  authorRole: 'story-content__author-role',
}

const StoryContentChildAuthorDetailsTrust = ({
  author,
  authorLink,
  authorImage,
  authorRole,
  authorEmail,
}) => {
  return (
    <>
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
    </>
  )
}

export default StoryContentChildAuthorDetailsTrust
