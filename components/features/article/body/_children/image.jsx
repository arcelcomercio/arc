import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'visual__image visual__image--cover',
  description: 'news-media-description text-left',
}

const ArticleBodyChildArticleImage = props => {
  const { data } = props
  return (
    <>
      <Image
        width="100%"
        layout=""
        imgClassName={classes.image}
        sizePreset="large"
        {...data}
      />
    </>
  )
}

export default ArticleBodyChildArticleImage
