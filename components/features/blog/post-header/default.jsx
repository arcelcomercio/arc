import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

@Consumer
class BlogPostHeader extends Component {
  constructor(...props) {
    super(...props)
    this.state = {}
  }

  more = () => {
    console.log('asdasd')
  }

  render() {
    return (
      <div>
        <h1>Venganza y esperanza</h1>
        <ul>
          <li>
            <a href="/#">l</a>
          </li>
          <li>
            <a href="/#">f</a>
          </li>
          <li>
            <a href="/#">w</a>
          </li>
          <div onClick={this.more()}>+</div>
        </ul>
      </div>
    )
  }
}

BlogPostHeader.label = 'Cabecera del post'

export default BlogPostHeader
