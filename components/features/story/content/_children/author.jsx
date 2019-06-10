import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

/** TODO: Vale la pena usar moment? */

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
        <p>Actualizado {date && formatDate(date)}</p>
      </div>
    </div>
  )
}

export default StoryContentChildAuthor
