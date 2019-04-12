import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import Image from '@arc-core-components/element_image'
import renderHTML from 'react-render-html'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description',
}
@Consumer
class ArticleImage extends PureComponent {
  render() {
    const {
      data: {
        resized_urls: resizedUrls = '',
        subtitle = '',
        caption = '',
      } = {},
    } = this.props

    return (
      <Fragment>
        <Image
          resized_urls={resizedUrls}
          aspectRatio="2:3"
          alt={subtitle}
          className={classes.image}
          width=""
          height=""
          layout=""
          url=""
        />
        {caption && (
          <figcaption className={classes.description}>
            {renderHTML(caption)}
          </figcaption>
        )}
      </Fragment>
    )
  }
}
export default ArticleImage
