import React from 'react'

const classes = {
  item: `blog-item flex w-full flex-col-reverse pt-10 mt-0 mb-30 mx-auto border-t-1 border-solid border-gray md:flex-col`,
  date: 'blog-item__date text-sm text-gray-200 md:mb-10',
  container: `blog-item__container flex flex-row-reverse justify-between md:flex-row md:justify-start`,
  containerAvatar: 'blog-item__container-avatar overflow-hidden',
  avatar: 'w-full h-full object-cover',
  detail: 'blog-item__detail flex flex-col pr-20 md:pr-0 md:pl-20',
  blogTitle: 'blog-item__blog uppercase mb-5 text-sm',
  author: 'blog-item__author mb-10 text-md text-gray-200 md:font-bold',
  post: 'blog-item__post text-xl text-gray-300 line-h-xs',
}

const BlogListChildItem = ({
  isAdmin,
  lazyImage,
  authorImg,
  date = '',
  blogTitle = '',
  author = '',
  postTitle = '',
  urlPost = '',
  urlBlog = '',
}) => {
  /**
   * TODO:CARLOS: verificar semantica en HTML
   * no hay <hX> y es necesario dar descripcion al alt.
   */
  return (
    <div className={classes.item}>
      <div className={classes.date}>{date}</div>
      <div className={classes.container}>
        <figure className={classes.containerAvatar}>
          <a href={urlBlog}>
            <img
              src={isAdmin ? authorImg : lazyImage}
              data-src={authorImg}
              alt=""
              className={`${isAdmin ? '' : 'lazy'} ${classes.avatar}`}
              
            />
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
