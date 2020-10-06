import React from 'react'
import { formatDateStory } from '../../../../utilities/date-time/dates'
import { GALLERY_VERTICAL } from '../../../../utilities/constants/subtypes'

const classes = {
  author:
    'story-content__author flex justify-between flex-col  amp-sh mx-auto p-10 md:flex-row',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorDate:
    'story-content__date flex items-center secondary-font text-md text-gray-200 pl-10 pb-10 line-h-sm',
  authorTime: 'story-content__time',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
}

const StoryContentChildAuthor = ({
  author,
  authorLink,
  updatedDate,
  authorEmail,
  primarySection = '',
  subtype,
}) => {
  return (
    <>
      <div
        className={`${classes.author} ${subtype === GALLERY_VERTICAL && 'gv'}`}>
        {/* // TODO: Cambiar este div por <address> */}
        {primarySection !== 'Columnistas' && (
          <div className="p-10">
            {author && (
              <a
                itemProp="url"
                href={authorLink}
                className={classes.authorNameLink}>
                {author}
              </a>
            )}
            {authorEmail && true && (
              <p itemProp="description" className={classes.authorEmail}>
                {' '}
                {authorEmail}{' '}
              </p>
            )}
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

export default StoryContentChildAuthor
