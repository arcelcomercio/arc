import React from 'react'
import { createMarkup } from '../../../../utilities/helpers'

const classes = {
  authorDetails: 'author-details bg-base-300 grid w-full',
  title:
    'author-details__title text-center uppercase font-bold text-md line-h-sm',
  body: 'author-details__body p-20 bg-white text-white',
  blogTitle: 'author-details__blog-title uppercase font-bold mb-10 text-md',
  description: 'author-details__description text-md line-h-md',
}
const AuthorDetailsChildAuthorDetails = ({ description, firstName, title }) => {
  return (
    <div className={classes.authorDetails}>
      <h4 itemProp="name" className={classes.title}>{title || 'Título'}</h4>
      <div className={classes.body}>
        <h3 itemProp="name" className={classes.blogTitle}>{firstName || 'Nombre'} </h3>
        <p
          className={classes.description}
          dangerouslySetInnerHTML={createMarkup(description)}
        />
      </div>
    </div>
  )
}

export default AuthorDetailsChildAuthorDetails
