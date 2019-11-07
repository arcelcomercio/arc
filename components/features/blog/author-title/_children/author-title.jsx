import React from 'react'

const classes = {
  authorTitle: 'author-title bg-white flex justify-between pt-15 pb-15',
  title: `author-title__box-title flex flex-grow-0 flex-shrink-0 flex-col h-full pt-10 pb-10 pl-15 border-b-1 border-t-1 border-solid border-gray md:flex-row md:items-center md:pl-15 md:p-0`,
  section: `author-title__section position-relative flex-grow-0 flex-shrink-0 border-b-1 border-t-1 border-solid border-gray line-h-none title-xs md:flex-shrink md:pt-10 md:mt-10 md:font-bold md:flex-grow`,
  url: 'author-title__url mr-15 title-sm line-h-xs mb-5',
  name: 'flex items-center text-xl',
  img: `author-title__img title-md bottom-0 right-0 position-absolute h-full w-full object-contain border-0 md:w-auto`,
}

const BlogAuthorTitleChildAuthorTitle = ({
  firstName,
  authorImg,
  blogName,
  path,
}) => {
  return (
    <div className={classes.authorTitle}>
      <div className={classes.title}>
        <a href={path} className={classes.url}>
          {blogName}
        </a>
        <p className={classes.name}>{firstName}</p>
      </div>
      <div className={classes.section}>
        <img
          src={authorImg}
          alt={`Foto del autor: ${firstName}`}
          title={firstName}
          className={classes.img}
        />
      </div>
    </div>
  )
}

export default BlogAuthorTitleChildAuthorTitle
