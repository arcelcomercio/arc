import React from 'react'
import Image from '@arc-core-components/element_image'

const classes = {
  gallery: 'article-gallery',
  galleryItem: 'article-gallery__item',
  galleryNumber:'article-gallery__number flex-center',
  image:'article-gallery__img',
}

const ArticleHeaderChildGallery = props => {
  const { data: { content_elements: elements = [] } = {} } = props

  return (
    <div className={classes.gallery}>
      {elements.map((data, index) => (
        <div className={classes.galleryItem}>
          <div className={classes.galleryNumber}>{index + 1}</div>
          <Image width="100%" className={classes.image} {...data} />
        </div>
      ))}
    </div>
  )
}

export default ArticleHeaderChildGallery
