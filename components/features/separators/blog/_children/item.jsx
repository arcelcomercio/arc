import React from 'react'

const classes = {
  separator: 'blog-separator flex flex-col flex-no-wrap',
  boxTitle: 'blog-separator__box-title w-full overflow-hidden',
  title: 'blog-separator__title',
  link: 'blog-separator__link',
  middle: 'blog-separator__box-middle flex flex-col justify-center',
  section: 'blog-separator__section block',
  author: 'blog-separator__author block',
  boxImg: 'blog-separator__box-img flex justify-center',
  img: 'blog-separator__img object-contain',
}

const SeparatorBlogChildItem = ({
  authorName,
  authorImg,
  blogUrl,
  blogName,
  postLink,
  postTitle,
}) => {
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
          <img src={authorImg} alt="" className={classes.img} />
        </a>
      </div>
    </div>
  )
}
export default SeparatorBlogChildItem
