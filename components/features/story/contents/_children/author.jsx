import React from 'react'
import { formatDateStory, getDateSeo } from '../../../../utilities/helpers'

const classes = {
  author:
    'story-content__author flex justify-between pt-30 mb-20 flex-col md:flex-row',
  authorNameLink:
    'secondary-font font-bold story-content__author-link header__link text-lg text-gray-200 line-h-sm',
  authorDate:
    'story-content__date flex items-center secondary-font text-md text-gray-200 line-h-sm',
  authorEmail:
    'story-content__author-email secondary-font text-md text-gray-200 line-h-sm',
}

const StoryContentChildAuthor = ({
  author,
  authorLink,
  updatedDate,
  authorEmail,
  primarySection = '',
}) => {
  return (
    <>
      <div className={classes.author}>
        {/* // TODO: Cambiar este div por <address> */}
        {primarySection !== 'Columnistas' && (
          <div>
            {author && (
              <a href={authorLink} className={classes.authorNameLink}>
                {author}
              </a>
            )}
            {authorEmail && true && (
              <p className={classes.authorEmail}> {authorEmail} </p>
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
