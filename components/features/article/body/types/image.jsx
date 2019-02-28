// content/sources/content-api-v4.js
import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import Image from '@arc-core-components/element_image'
import renderHTML from 'react-render-html'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description',
}
@Consumer
class ImageConent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <Image
          resized_urls={this.props.data.resized_urls}
          aspectRatio="2:3"
          alt={this.props.data.subtitle}
          className={classes.image}
          width=""
          height=""
          layout=""
          url=""
        />
        {this.props.data.caption && (
          <figcaption className={classes.description}>
            {renderHTML(this.props.data.caption)}
          </figcaption>
        )}
      </Fragment>
    )
  }
}
export default ImageConent
