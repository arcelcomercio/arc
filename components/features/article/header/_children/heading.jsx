import React from 'react'

const classes = {
  title: 'article-header__news-title',
}

const ArticleHeaderChildHeading = props => {
  const {
    data: { headlines: titleElements = {} },
  } = props || {}

  return (
    titleElements && <h1 className={classes.title}> {titleElements.basic}</h1>
  )
}

export default ArticleHeaderChildHeading
