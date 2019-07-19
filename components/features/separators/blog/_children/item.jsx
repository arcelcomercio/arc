import React from 'react'

const classes = {
  separator: 'blog-separator bg-white flex-no-wrap w-full',
  boxTitle:
    'blog-separator__box-title w-full overflow-hidden  pl-15 pr-15 pb-15',
  title: 'blog-separator__title font-normal text-lg',
  link: 'blog-separator__link text-gray-300 title-xs',
  middle:
    'blog-separator__box-middle flex flex-col justify-center pl-15 pr-15 pt-15',
  section: 'blog-separator__section block text-sm',
  author: 'blog-separator__author block title-sm text-gray-300 primary-font',
  boxImg: 'flex items-center md:items-start pt-15 pl-15 ',
  img: 'blog-separator__img object-contain',
}

const SeparatorBlogChildItem = ({
  authorName,
  authorImg,
  blogUrl,
  // blogName,
  postLink,
  postTitle,
}) => {
  return (
    <div className={classes.separator}>
      <div className={classes.boxImg}>
        <a href={postLink}>
          <img src={authorImg} alt="" className={classes.img} />
        </a>
      </div>
      <div>
        <div className={classes.middle}>
          <a href={blogUrl} className={classes.author}>
            {authorName}
          </a>
        </div>
        <div className={classes.boxTitle}>
          <h1 className={classes.title}>
            <a href={postLink} className={classes.link}>
              {postTitle}
            </a>
          </h1>
        </div>
      </div>
    </div>
  )
}
export default SeparatorBlogChildItem
