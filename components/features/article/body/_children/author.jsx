import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

/** TODO: Vale la pena usar moment? */

const classes = {
  author: 'article-body__author flex flex--justify-between',
  authorName: 'article-body__author-info',
  authorDate: 'article-body__author-date flex flex--align-center ',
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
        {email && <p className={classes.authorEmail}> {email} </p>}
      </div>
      <div className={classes.authorDate}>
        <p>Actualizado {date && formatDate(date)}</p>
      </div>
    </div>
  )
}

export default ArticleBodyChildAuthor
