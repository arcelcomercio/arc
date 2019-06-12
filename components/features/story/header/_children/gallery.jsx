import React from 'react'
import Image from '@arc-core-components/element_image'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  gallery: 'story-gallery',
  galleryItem: 'story-gallery__item position-relative',
  galleryNumber: 'story-gallery__number position-absolute flex items-center justify-center',
  image: 'story-gallery__img',
  caption: 'story-gallery__caption',
}

const StoryHeaderChildGallery = props => {
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

export default StoryHeaderChildGallery
