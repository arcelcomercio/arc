import React from 'react'

const classes = {
  item: 'flex  blog-item w-full',
  date: 'blog-item__date',
  container: 'flex blog-item__container',
  containerAvatar: 'blog-item__container-avatar',
  avatar: 'w-full',
  detail: 'flex flex-col blog-item__detail',
  blogTitle: 'uppercase blog-item__blog',
  author: 'blog-item__author',
  post: 'blog-item__post',
}

const BlogListChildItem = ({
  imageUrl,
  date = '',
  blogTitle = '',
  author = '',
  postTitle = '',
  urlPost = '',
  urlBlog = '',
}) => {
  return (
    <div className={classes.item}>
      <div className={classes.date}>{date}</div>
      <div className={classes.container}>
        <figure className={classes.containerAvatar}>
          <a href={urlBlog}>
            <img src={imageUrl} alt="" className={classes.avatar} />
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

export default BlogListChildItem
