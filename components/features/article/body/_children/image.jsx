import React, { Fragment } from 'react'

import Image from '@arc-core-components/element_image'
import renderHTML from 'react-render-html'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description',
}

const ArticleBodyChildArticleImage = props => {
  const { data } = props
  console.log(data)
  return (
    <Fragment>
      <Image
        width="100%"
        className={classes.image}
        sizePreset="large"
        {...data}
      />
      {data && data.subtitle && (
        <figcaption className={classes.description}>
          {renderHTML(data.subtitle)}
        </figcaption>
      )}
    </Fragment>
  )
}

export default ArticleBodyChildArticleImage
