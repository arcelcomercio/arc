import React from 'react'

const classes = {
  infoAutor: 'author-detail',
  title: 'author-detail__title',
  body: 'author-detail__blog',
  titleblog: 'author-detail__blog-title',
  description: 'author-detail__description',
}
const AuthorDetails = ({ description, firstName, title }) => {
  return (
    <div className={classes.infoAutor}>
      <h4 className={classes.title}>{title || 'Titulo'}</h4>
      <div className={classes.body}>
        <h3 className={classes.titleblog}>{firstName || 'Nombre'} </h3>
        <p className={classes.description}>{description || 'Descripcion'}</p>
      </div>
    </div>
  )
}

export default AuthorDetails
