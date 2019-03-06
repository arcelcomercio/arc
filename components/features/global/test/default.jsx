import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class GlobalTest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fetch()
  }

  fetch() {
    const { arcSite } = this.props

    const source = 'test'
    const params = {
      website: arcSite,
      numStories: 3,
      section: 'economia',
      startDate: '2019-03-05',
      finalDate: '2019-03-06',
    }
    const schema = `{ 
     content_elements {
       canonical_url
     }
    }`
    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      console.log(this.props)
      console.log(response)
    })
  }

  render() {
    return (
      <div>
        <h1>hola</h1>
      </div>
    )
  }
}

export default GlobalTest
