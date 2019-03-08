import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

@Consumer
class Heading extends Component {
  render() {
    const {
      globalContent: { headlines: titleElements },
    } = this.props
    return (
      <Fragment>
        {titleElements && (
          <h1 className="news-title"> {titleElements.basic}</h1>
        )}
      </Fragment>
    )
  }
}

Heading.propTypes = {
  globalContent: PropTypes.object,
}

export default Heading
