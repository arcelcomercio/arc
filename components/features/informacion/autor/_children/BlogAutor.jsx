import React from 'react'

const classes = {
  body: 'infoAutor__blogAutor',
  titleblog: 'infoAutor__titleBlog',
  description: 'infoAutor__description',
}
const BlogAutor = ({autorName,inforAutor}) => {
  return (
    <div className={classes.body}>
      <h3 className={classes.titleblog}>{autorName} </h3>
      <p className={classes.description}>
        {inforAutor}
      </p>
    </div>
  )
}

export default BlogAutor
