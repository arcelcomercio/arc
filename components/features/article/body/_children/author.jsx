import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

/** TODO: Vale la pena usar moment? */

const classes = {
  author: 'article-body__author',
  authorName: 'article-body__author-name',
  authorDate: 'article-body__author-date',
  authorEmail: 'article-body__author-email',
}

const ArticleBodyChildAuthor = props => {
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
      </div>
      {email && <div className={classes.authorEmail}> {email} </div>}
      <div className={classes.authorDate}>
        Actualizado {date && formatDate(date)}
      </div>
    </div>
  )
}

export default ArticleBodyChildAuthor
