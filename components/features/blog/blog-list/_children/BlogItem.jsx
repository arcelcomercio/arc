import React from 'react'

export default ({
  urlImage = '',
  date = '',
  blogTitle = '',
  author = '',
  postTitle = '',
  urlPost = '',
  urlBlog = '',
}) => {
  const classes = {
    item: 'blog-item',
    date: 'blog-item__date',
    container: 'blog-item__container',
    containerAvatar: 'blog-item__container-avatar',
    avatar: 'blog-item__avatar',
    detail: 'blog-item__detail',
    blogTitle: 'blog-item__blog',
    author: 'blog-item__author',
    post: 'blog-item__post',
  }

  const image =
    urlImage !== ''
      ? urlImage
      : 'https://img.gestion.pe/bundles/appcms/images/gestion/default_blog.jpg'

  return (
    <div className={classes.item}>
      <div className={classes.date}>{date}</div>
      <div className={classes.container}>
        <figure className={classes.containerAvatar}>
          <a href={urlBlog}>
            <img src={image} alt="" className={classes.avatar} />
          </a>
        </figure>
        <div className={classes.detail}>
          <a href={urlBlog} className={classes.blogTitle}>
            {blogTitle}
          </a>
          <a href={urlBlog} className={classes.author}>
            {author}
          </a>
          <a className={classes.post} href={urlPost}>
            {postTitle}
          </a>
        </div>
      </div>
    </div>
  )
}
