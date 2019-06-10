import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'

const classes = {
  authorDetails: 'author-details',
  title: 'author-details__title text-center uppercase',
  body: 'author-details__body',
  blogTitle: 'author-details__blog-title uppercase',
  description: 'author-details__description',
}
const AuthorDetailsChildAuthorDetails = ({ description, firstName, title }) => {
  return (
    <div className={classes.authorDetails}>
      <h4 className={classes.title}>{title || 'Título'}</h4>
      <div className={classes.body}>
        <h3 className={classes.blogTitle}>{firstName || 'Nombre'} </h3>
        <p
          className={classes.description}
          dangerouslySetInnerHTML={createMarkup(description)}
        />
      </div>
    </div>
  )
}

export default AuthorDetailsChildAuthorDetails
