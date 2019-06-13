import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

const classes = {
  author: 'flex flex--justify-between pd-top-30 mg-bottom-20',
  authorName: '',
  authorDate: 'text-xs flex flex--align-center ',
  authorEmail: 'text-sm',
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
        {name && <a href={url}>{name} </a>}
        {email && <p className={classes.authorEmail}> {email} </p>}
      </div>
      <div className={classes.authorDate}>
        <time dateTime={date}>Actualizado {date && formatDate(date)}</time>
      </div>
    </div>
  )
}

export default StoryContentChildAuthor
