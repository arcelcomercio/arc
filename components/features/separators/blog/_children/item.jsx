import React from 'react'

const classes = {
  item:
    'blog-separator__item flex flex-row p-20 mb-10 bg-white flex-no-wrap w-full lg:flex-col lg:mb-0 lg:mr-5',
  title: 'blog-separator__title inline-block w-full overflow-hidden pt-15',
  link: 'blog-separator__link text-gray-300 font-normal text-xl',
  author:
    'blog-separator__author flex flex-col justify-center title-sm text-gray-300 primary-font lg:pt-15',
  boxImg:
    'flex items-center lg:items-start mr-20 pl-5 pr-5 lg:mr-0 lg:pl-0 lg:pr-0',
  img: 'blog-separator__img object-cover rounded',
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
    <article className={classes.item}>
      <a className={classes.boxImg} href={postLink}>
        <figure>
          <img
            src={authorImg}
            alt={`Foto de perfil de ${authorName}`}
            className={classes.img}
            loading="lazy"
          />
        </figure>
      </a>
      <div>
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
