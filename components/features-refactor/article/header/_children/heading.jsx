import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'

const classes = {
  title: 'article-header__news-title',
}
@Consumer
class ArticleHeaderChildHeading extends Component {
  render() {
    const { globalContent } = this.props
    const { headlines: titleElements = {} } = globalContent || {}

    return (
      <Fragment>
        {titleElements && (
          <h1 className={classes.title}> {titleElements.basic}</h1>
        )}
      </Fragment>
    )
  }
}

export default ArticleHeaderChildHeading
