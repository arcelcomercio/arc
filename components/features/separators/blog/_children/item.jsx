import React from 'react'

const classes = {
  item:
    'blog-separator__item flex flex-row justify-between pt-0 lg:pt-15 mb-10 bg-white flex-no-wrap w-full lg:flex-col lg:mb-0 lg:mr-5',
  title:
    'blog-separator__title inline-block w-full overflow-hidden pl-15 pr-15 pb-15 pt-15 lg:pt-0',
  link: 'blog-separator__link text-gray-300 font-normal',
  author:
    'blog-separator__author flex flex-col justify-center  primary-font  pl-15 pr-15',
  boxImg: 'flex items-center justify-center',
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
      <div>
        <h3 className={classes.title}>
          <a href={postLink} className={classes.link}>
            {postTitle}
          </a>
        </h3>
        <a href={blogUrl} className={classes.author}>
          {authorName}
        </a>
      </div>
      <a className={classes.boxImg} href={postLink}>
        <figure>
          <img
            src={isAdmin ? lazyImage : authorImg}
            data-src={authorImg}
            alt={`Foto de perfil de ${authorName}`}
            className={`${isAdmin ? '' : 'lazy'} ${classes.img}`}
            
          />
        </figure>
      </a>
    </article>
  )
}
export default SeparatorBlogChildItem
