import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const classes = {
  title: 'article-header__news-title',
}
@Consumer
class Heading extends Component {
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

Heading.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default Heading
