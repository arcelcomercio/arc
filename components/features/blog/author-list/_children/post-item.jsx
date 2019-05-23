import React from 'react'

const classes = {
  container: 'post-item__container',
  date: 'post-item__date',
  content: 'post-item__content',
  figure: 'post-item__figure',
  image: 'post-item__image',
  description: 'post-item__description',
  title: 'post-item__title',
  author: 'post-item__author',
}

const AuthorListChildPostItem = ({
  postTitle = '',
  postPermaLink = '',
  postDate = '',
  image = '',
  author = '',
}) => {
  return (
    <article className={classes.container}>
      <div className={classes.date}>
        <p>{postDate}</p>
      </div>
      <div className={classes.content}>
        <figure className={classes.figure}>
          <img className={classes.image} src={image} alt={author} />
        </figure>
        <div className={classes.description}>
          <a href={postPermaLink}>
            <h3 className={classes.title}>{postTitle}</h3>
          </a>
          <a href={postPermaLink}>
            <h5 className={classes.author}>{author}</h5>
          </a>
        </div>
      </div>
    </article>
  )
}

export default AuthorListChildPostItem
