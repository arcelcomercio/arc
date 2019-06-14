import React from 'react'

const classes = {
  item:
    'blog-item flex w-full flex-col-reverse pt-10 mt-0 mb-10 mx-auto border-t-1 border-solid',
  date: 'blog-item__date text-xs',
  container: 'blog-item__container flex flex-row-reverse justify-between',
  containerAvatar: 'blog-item__container-avatar',
  avatar: 'w-full',
  detail: 'blog-item__detail flex flex-col pr-10',
  blogTitle: 'blog-item__blog uppercase mb-5 text-xs',
  author: 'blog-item__author mb-10 text-sm',
  post: 'blog-item__post text-lg text-gray-300 line-h-none',
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
