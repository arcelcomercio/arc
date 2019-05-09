import React from 'react'

const classes = {
  authorDetails: 'author-details',
  title: 'author-details__title text-center text-uppercase',
  body: 'author-details__body',
  blogTitle: 'author-details__blog-title text-uppercase',
  description: 'author-details__description',
}
const AuthorDetailsChildAuthorDetails = ({ description, firstName, title }) => {
  return (
    <div className={classes.authorDetails}>
      <h4 className={classes.title}>{title || 'Título'}</h4>
      <div className={classes.body}>
        <h3 className={classes.blogTitle}>{firstName || 'Nombre'} </h3>
        <p className={classes.description}>{description || 'Descripción'}</p>
      </div>
    </div>
  )
}

export default AuthorDetailsChildAuthorDetails
