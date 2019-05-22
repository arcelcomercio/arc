import React, { Fragment } from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description',
}

const ArticleBodyChildArticleImage = props => {
  const { data } = props
  return (
    <Fragment>
      <div className="media norowmargin">
        <figure>
          <amp-img i-amphtml-layout="responsive">
            <i-amphtml-sizer />
            <Image
              width="100%"
              className={classes.image}
              sizePreset="large"
              {...data}
            />
          </amp-img>
        </figure>
      </div>
    </Fragment>
  )
}

export default ArticleBodyChildArticleImage
