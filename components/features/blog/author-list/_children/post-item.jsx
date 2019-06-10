import React from 'react'

const classes = {
  container: 'post-item flex',
  date: 'post-item__date flex justify-start',
  content: 'post-item__content flex',
  figure: 'post-item__figure',
  image: 'post-item__image object-fit-cover',
  description: 'post-item__description flex flex-col justify-between',
  title: 'post-item__title uppercase',
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
