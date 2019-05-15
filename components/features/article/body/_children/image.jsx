import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import Image from '@arc-core-components/element_image'
import renderHTML from 'react-render-html'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description',
}
@Consumer
class ArticleBodyChildArticleImage extends PureComponent {
  render() {
    const { data } = this.props
    return (
      <Fragment>
        <Image
          width="100%"
          className={classes.image}
          sizePreset="small"
          {...data}
        />
        {data && data.caption && (
          <figcaption className={classes.description}>
            {renderHTML(data.caption)}
          </figcaption>
        )}
      </Fragment>
    )
  }
}
export default ArticleBodyChildArticleImage
