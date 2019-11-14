import React from 'react'

const classes = {
  container:
    'post-item bg-white flex secondary-font flex-col-reverse h-auto pt-10 pb-10 pr-15 pl-15 border-t-1 border-solid border-gray md:flex-col',
  date:
    'post-item__date flex justify-start pt-5 pb-5 pr-10 pl-10 text-xs text-gray-200 md:pt-5 md:pb-5 md:pr-0 md:pl-0',
  content:
    'post-item__content flex justify-between flex-row-reverse md:flex-row md:justify-start',
  figure: 'post-item__figure',
  image: 'post-item__image object-cover',
  description:
    'post-item__description flex flex-col justify-between pr-10 pl-10',
  title:
    'post-item__title uppercase m-0 font-thin title-sm text-gray-300 line-h-none',
  author: 'post-item__author m-0 font-thin text-xs text-gray-200 ',
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
          {/* // TODO:CARLOS: verificar si el alt de esta imagen es realmente author */}
          <a href={postPermaLink}>
            <img
              className={classes.image}
              src={image}
              alt={author}              
            />
          </a>
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
