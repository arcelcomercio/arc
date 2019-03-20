import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class container1 extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { globalContent } = this.props

    const params = {
      data: globalContent.content_elements || [],
    }
  }

  render() {
    return (
      <Fragment>
        <p>ccc</p>
      </Fragment>
    )
  }
}

export default container1
