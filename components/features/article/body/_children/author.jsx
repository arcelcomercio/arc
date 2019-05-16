import React from 'react'
import { formatDate } from '../../../../utilities/helpers'

/** TODO: Vale la pena usar moment? */

const classes = {
  author: 'article-body__author',
  authorName: 'article-body__author-nombre',
  authorDate: 'article-body__author-date',
  authorEmail: 'article-body__author-email',
}

const ArticleBodyChildAuthor = props => {
  const {
    date,
    data: {
      by: [
        {
          name: nombre = '',
          url,
          additional_properties: {
            original: { email },
          },
        },
      ],
    },
  } = props
  console.log(props)
  return (
    nombre && (
      <div className={classes.author}>
        <div className={classes.authorName}>
          {nombre && <a href={url}>{nombre} </a>}
        </div>
        <div className={classes.authorEmail}> {email} </div>
        <div className={classes.authorDate}>
          Actualizado {date && formatDate(date)}
        </div>
      </div>
    )
  )
}

export default ArticleBodyChildAuthor
