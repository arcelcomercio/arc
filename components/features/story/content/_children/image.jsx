import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image w-full h-full',
  description:
    'story-content__news-media-description text-left m-0 pt-5 primary-font text-sm',
}

const StoryContentChildImage = ({ data }) => {
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

export default StoryContentChildImage
