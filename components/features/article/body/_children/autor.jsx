import React from 'react'
import Moment from 'react-moment'

/** TODO: Vale la pena usar moment? */

const classes = {
  newsAuthor: 'news-author-date',
}
export default props => {
  const { date, by } = props
  const {
    author: [{ name, slug = '' } = {}],
  } = by || []

  return (
    (name || date) && (
      <div className={classes.newsAuthor}>
        {name && <a href={slug && `/${slug}`}>{name} </a>}
        {date && <Moment format="DD.MM.YYYY / LT " date={date} />}
      </div>
    )
  )
}
