import React from 'react'
import Image from '@arc-core-components/element_image'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  gallery: 'article-gallery',
  galleryItem: 'article-gallery__item',
  galleryNumber: 'article-gallery__number flex items-center justify-center',
  image: 'article-gallery__img',
  caption: 'article-gallery__caption',
}

const ArticleHeaderChildGallery = props => {
  const { data: { content_elements: elements = [] } = {} } = props

  return (
    <div className={classes.gallery}>
      {elements.map((data, index) => (
        <div className={classes.galleryItem} key={UtilListKey(index)}>
          <div className={classes.galleryNumber}>{index + 1}</div>
          <Image
            width="100%"
            imgClassName={classes.image}
            captionClassName={classes.caption}
            {...data}
          />
        </div>
      ))}
    </div>
  )
}

export default ArticleHeaderChildGallery
