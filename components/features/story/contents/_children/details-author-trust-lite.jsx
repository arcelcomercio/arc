import React from 'react'
import Image from '../../../../global-components/image'

const DEFAULT_AUTHOR_IMG =
  'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/author.png?d=1'
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

export default StoryContentChildDetailsAuthorTrustLite
