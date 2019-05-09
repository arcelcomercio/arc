import React from 'react'
import { formatDate } from '../../../../../resources/utilsJs/helpers'

/** TODO: Vale la pena usar moment? */

const classes = {
  newsAuthor: 'news-author-date',
}

export default props => {
  const {
    date,
    data: { by },
  } = props

  return (
    (by || date) && (
      <div className={classes.newsAuthor}>
        {by.name && <a href={by.url}>{by.name} </a>}
        {date && formatDate(date)}
      </div>
    )
  )
}
