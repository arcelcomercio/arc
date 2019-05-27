import React from 'react'

const classes = {
  authorTitle: 'author-title',
  title: 'author-title__box-title',
  section: 'author-title__section position-relative',
  url: 'author-title__url',
  name: 'author-title__name',
  img: 'author-title__img position-absolute',
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
        <img src={guid} alt={firstName} className={classes.img} />
      </div>
    </div>
  )
}

export default BlogAuthorTitleChildAuthorTitle
