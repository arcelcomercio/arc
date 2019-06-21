import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image w-full h-full',
  description:
    'story-content__news-media-description text-left m-0 pt-5 primary-font text-sm text-gray-200',
}

const StoryContentChildImage = ({ data, imgTag }) => {
  return (
    <>
      <Image
        width="100%"
        layout="responsive"
        ImgTag={imgTag}
        imgClassName={classes.image}
        sizePreset="large"
        {...data}
      />
    </>
  )
}

export default StoryContentChildImage
