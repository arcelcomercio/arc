import React from 'react'

const classes = {
  containerGrid: 'blog-list-grid',
  itemGrid: 'blog-list-grid__item',
  date: '',
  imageAuthor: '',
  content: '',
  image: '',
}

const BlogPostListGridChildList = ({ data }) => {
  return (
    <div className={classes.containerGrid}>
      {data &&
        data.map((row, index) => {
          return (
            <div className={classes.itemGrid}>
              <div className={classes.date}>fecha</div>
              <div className={classes.imageAuthor}>imagen autor</div>
              <div className={classes.content}>contenido</div>
              <div className={classes.image}>imagen</div>
            </div>
          )
        })}
    </div>
  )
}

export default BlogPostListGridChildList
