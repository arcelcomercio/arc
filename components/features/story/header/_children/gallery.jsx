import React from 'react'
import Image from '@arc-core-components/element_image'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  gallery: 'story-gallery pt-10 pr-20 pl-20 md:pr-0 md:pl-0',
  galleryItem: 'story-gallery__item position-relative mt-30',
  galleryNumber:
    'story-gallery__number bg-white flex items-center justify-center position-absolute rounded-lg',
  image: 'story-gallery__img w-full h-full mb-10',
  caption: 'story-gallery__caption text-gray-200 text-sm',
}

const StoryHeaderChildGallery = props => {
  const {
    contentElementGallery: { content_elements: elements = [] } = {},
  } = props
  return (
    <div className={classes.gallery}>
      {elements.map((data, index) => (
        <div className={classes.galleryItem} key={UtilListKey(index)}>
          <div className={classes.galleryNumber}>{index + 1}</div>
          <Image
            width="100%"
            layout=""
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
