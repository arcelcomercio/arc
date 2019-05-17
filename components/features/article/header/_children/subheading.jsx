import React from 'react'

const classes = {
  description: 'article-header__news-summary',
}

const ArticleHeaderChildShareSubheading = data => {
  const {
    data: { subheadlines: description = {} },
  } = data || {}

  return (
    description && <h2 className={classes.description}> {description.basic}</h2>
  )
}

export default ArticleHeaderChildShareSubheading
