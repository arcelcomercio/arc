import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const classes = {
  description: 'article-header__news-summary',
}
@Consumer
class Subheading extends Component {
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

Subheading.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default Subheading
