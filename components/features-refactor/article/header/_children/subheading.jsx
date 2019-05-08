import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'

const classes = {
  description: 'article-header__news-summary',
}
@Consumer
class ArticleHeaderChildShareSubheading extends Component {
  render() {
    const { globalContent } = this.props
    const { subheadlines: subtitle = {} } = globalContent || {}

    return (
      <Fragment>
        {subtitle && subtitle.basic && (
          <h2 className={classes.description}> {subtitle.basic}</h2>
        )}
      </Fragment>
    )
  }
}

export default ArticleHeaderChildShareSubheading
