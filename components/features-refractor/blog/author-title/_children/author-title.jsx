import React from 'react'

const classes = {
  authorTitle: 'author-title',
  section: 'author-title__section position-relative',
  url: 'author-title__url',
  img: 'author-title__img position-absolute',
}

const BlogAuthorTitleChildAuthorTitle = ({ firstName, guid, blogname }) => {
  return (
    <div className={classes.authorTitle}>
      <h1 className={classes.section}>
        <a href={firstName} className={classes.url}>
          {blogname}
        </a>
        {firstName}
        <img src={guid} alt={firstName} className={classes.img} />
      </h1>
    </div>
  )
}

export default BlogAuthorTitleChildAuthorTitle
