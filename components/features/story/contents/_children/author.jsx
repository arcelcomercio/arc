import React from 'react'
import { formatDateStory } from '../../../../utilities/helpers'

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

const StoryContentChildAuthor = props => {
  const { date, by = [], updatedDate } = props
  const [
    {
      name,
      url,
      additional_properties: { original: { email } = {} } = {},
    } = {},
  ] = by || []
  return (
    <div className={classes.author}>
      {/* // TODO: Cambiar este div por <address> */}
      <div>
        {name && (
          <a href={url} className={classes.authorNameLink}>
            {name}
          </a>
        )}
        {email && true && <p className={classes.authorEmail}> {email} </p>}
      </div>
      <div className={classes.authorDate}>
        <time dateTime={date}>
          {' '}
          {updatedDate && formatDateStory(updatedDate)}
        </time>
      </div>
    </div>
  )
}

export default StoryContentChildAuthor
