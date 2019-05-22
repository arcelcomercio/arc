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
          <amp-img
            src="https://img.elcomercio.pe/uploads/2019/05/19/5ce21be73eeff.jpeg"
            title="(Foto: Luis Gonzáles / El Comercio)"
            alt="(Foto: Luis Gonzáles / El Comercio)"
            width="304"
            height="190"
            layout="responsive"
            class="i-amphtml-element i-amphtml-layout-responsive i-amphtml-layout-size-defined i-amphtml-layout"
            i-amphtml-layout="responsive">
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
