import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class Default extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arcSite: '',
    }
  }

  componentDidMount() {
    const { globalContent, arcSite } = this.props

    this.setState({
      arcSite,
    })

    console.log(globalContent)
  }

  render() {
    const { arcSite } = this.state
    return (
      <Fragment>
        <p>{arcSite}</p>
      </Fragment>
    )
  }
}

export default Default
