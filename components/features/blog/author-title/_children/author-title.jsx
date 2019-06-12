import React from 'react'

const classes = {
  authorTitle: 'author-title flex justify-between pt-15 pb-15',
  title:
    'author-title__box-title flex flex-grow-0 flex-shrink-0 flex-col h-full pt-10 pb-10 pl-15',
  section: 'author-title__section position-relative flex-grow-0 flex-shrink-0',
  url: 'author-title__url mr-15',
  name: 'flex items-center',
  img:
    'author-title__img position-absolute h-full w-full object-contain right-0 bottom-0',
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
