import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

const classes = {
  author: 'flex justify-between pt-30 mb-20',
  authorName: ' ',
  authorNameLink: 'secondary-font text-sm text-gray-200 line-h-sm',
  authorDate: 'text-xs flex items-center ',
  authorEmail: 'secondary-font text-sm text-gray-200',
}

const StoryContentChildAuthor = props => {
  const { date, data: { by } = {} } = props
  const [
    {
      name,
      url,
      additional_properties: { original: { email = '' } = {} } = {},
    } = {},
  ] = by || []
  return (
    <div className={classes.author}>
      <div className={classes.authorName}>
        {name && (
          <a href={url} className={classes.authorNameLink}>
            {name}{' '}
          </a>
        )}
        {email && <p className={classes.authorEmail}> {email} </p>}
      </div>
      <div className={classes.authorDate}>
        <time dateTime={date}>Actualizado {date && formatDate(date)}</time>
      </div>
    </div>
  )
}

export default StoryContentChildAuthor
