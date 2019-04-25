import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

@Consumer
class TestDemo extends Component {
  render() {
    const { customFields, editableField } = this.props
    return (
      <h1 {...editableField('test')}>{customFields.test || 'initial text'}</h1>
    )
  }
}
TestDemo.propTypes = {
  customFields: PropTypes.shape({
    test: PropTypes.string,
  }),
}
export default TestDemo
