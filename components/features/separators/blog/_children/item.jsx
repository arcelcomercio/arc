import React from 'react'

const classes = {
  separator: 'blog-separator',
  boxTitle: 'blog-separator__box-title',
  title: 'blog-separator__title',
  link: 'blog-separator__link',
  middle: 'blog-separator__box-middle',
  section: 'blog-separator__section',
  author: 'blog-separator__author',
  boxImg: 'blog-separator__box-img',
  img: 'blog-separator__img',
}

const SeparatorBlogChildItem = ({
  authorName,
  authorImg,
  blogUrl,
  blogName,
  postLink,
  postTitle,
  defaultImg,
}) => {
  const DEFAULT_IMG = defaultImg
  const IMG = authorImg || DEFAULT_IMG
  return (
    <div className={classes.separator}>
      <div className={classes.boxTitle}>
        <h1 className={classes.title}>
          <a href={postLink} className={classes.link}>
            {postTitle}
          </a>
        </h1>
      </div>
      <div className={classes.middle}>
        <a href={blogUrl} className={classes.section}>
          {blogName}
        </a>
        <a href={blogUrl} className={classes.author}>
          {authorName}
        </a>
      </div>
      <div className={classes.boxImg}>
        <a href={postLink}>
          <img src={IMG} alt="" className={classes.img} />
        </a>
      </div>
    </div>
  )
}
export default SeparatorBlogChildItem
