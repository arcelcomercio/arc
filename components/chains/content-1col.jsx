import React, { Component } from 'react'
import PropTypes from 'prop-types'

const classes = 'content-grid-base col-1'

class Content1Col extends Component {
  render() {
    const {
      children,
      customFields: { staticHeight },
    } = this.props

    return (
      <section className={`${classes} ${staticHeight && 'row-1'}`}>
        {children}
      </section>
    )
  }
}

Content1Col.propTypes = {
  customFields: PropTypes.shape({
    staticHeight: PropTypes.bool.tag({
      name: '¿Alto fijo?',
    }),
  }),
}

export default Content1Col
