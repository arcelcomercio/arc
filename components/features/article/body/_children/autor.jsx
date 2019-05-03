import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

/** TODO: Vale la pena usar moment? */

const classes = {
  newsAuthor: 'news-author-date',
}

export default props => {
  const {
    date,
    data: { by: [{ name = {}, url = {} }] = {} },
  } = props

  return (
    (name || date) && (
      <div className={classes.newsAuthor}>
        {name && <a href={url}>{name} </a>}
        {date && formatDate(date)}
      </div>
    )
  )
}
