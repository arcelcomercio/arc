import React from 'react'
import Image from '../../../../global-components/image'

const DEFAULT_AUTHOR_IMG =
  'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/author.png?d=1'
const classes = {
  authorInfo: 'story-content__author-info flex',
  authorNameLink:
    'story-content__author-link inline-block secondary-font font-bold text-lg text-gray-300 line-h-sm',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
  authorImage: 'story-content__author-image rounded',
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
            <Image
              itemProp="image"
              src={authorImage}
              width={57}
              height={57}
              title={author}
              alt={author}
              placeholder={DEFAULT_AUTHOR_IMG}
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
