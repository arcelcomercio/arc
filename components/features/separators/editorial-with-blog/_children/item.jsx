import React from 'react'

const classes = {
  item:
    'blog-separator__item flex flex-row pt-0 lg:pt-15 mb-10 flex-no-wrap w-full lg:flex-col lg:mb-0 lg:mr-5',
  title:
    'blog-separator__title inline-block w-full overflow-hidden pl-15 pr-15 lg:pb-15 pt-15 lg:pt-0',
  link: 'blog-separator__link text-gray-300 font-normal',
  author:
    'blog-separator__author flex flex-col justify-center primary-font pl-15 pr-15',
  authorWrapper: 'w-full pt-20 lg:pt-0 pb-20 lg:pb-0',
  boxImg: 'flex items-center pl-20 pr-20',
  img: 'blog-separator__img object-cover',
}

const SeparatorBlogChildItem = ({
  authorName,
  lazyImage,
  authorImg,
  blogUrl,
  // blogName,
  postLink,
  postTitle,
  isAdmin,
}) => {
  return (
    <article className={classes.item}>
      <a className={classes.boxImg} href={postLink}>
        <figure>
          <img
            src={isAdmin ? authorImg : lazyImage}
            data-src={authorImg}
            alt={`Foto de perfil de ${authorName}`}
            title={authorName}
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
          />
        </figure>
      </a>
      <div className={classes.authorWrapper}>
        <a href={blogUrl} className={classes.author}>
          {authorName}
        </a>
        <h3 className={classes.title}>
          <a href={postLink} className={classes.link}>
            {postTitle}
          </a>
        </h3>
      </div>
    </article>
  )
}
export default SeparatorBlogChildItem
