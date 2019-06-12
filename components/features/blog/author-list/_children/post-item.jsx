import React from 'react'

const classes = {
  container:
    'post-item flex secondary-font flex-col-reverse h-auto pt-5 pb-5 pr-15 pl-15',
  date: 'post-item__date flex justify-start pt-5 pb-5 pr-10 pl-10',
  content: 'post-item__content flex justify-between flex-row-reverse',
  figure: 'post-item__figure',
  image: 'post-item__image object-cover',
  description:
    'post-item__description flex flex-col justify-between pr-10 pl-10',
  title: 'post-item__title uppercase m-0 font-thin',
  author: 'post-item__author m-0 font-thin',
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
