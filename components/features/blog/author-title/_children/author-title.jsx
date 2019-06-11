import React from 'react'

const classes = {
  authorTitle: 'author-title flex justify-between',
  title: 'author-title__box-title flex flex-grow-0 flex-shrink-0',
  section: 'author-title__section position-relative',
  url: 'author-title__url',
  name: 'flex items-center',
  img: 'author-title__img position-absolute h-full w-full object-contain',
}

const BlogAuthorTitleChildAuthorTitle = ({
  firstName,
  guid,
  blogname,
  path,
}) => {
  return (
    <div className={classes.authorTitle}>
      <div className={classes.title}>
        <a href={path} className={classes.url}>
          {blogname}
        </a>
        <p className={classes.name}>{firstName}</p>
      </div>
      <div className={classes.section}>
        <img
          src={guid}
          alt={`Foto del autor: ${firstName}`}
          className={classes.img}
        />
      </div>
    </div>
  )
}

export default BlogAuthorTitleChildAuthorTitle
