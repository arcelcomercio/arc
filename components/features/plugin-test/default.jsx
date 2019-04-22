import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class PluginTest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>asdasdasd</h1>
      </div>
    )
  }
}

PluginTest.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.disabled.tag({
      formPlugin: 'text-editor',
      defaultValue: 'asdasdasdasd',
    }),
  }),
}

export default PluginTest
