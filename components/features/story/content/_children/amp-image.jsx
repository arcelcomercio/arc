import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image',
  description: 'story-content__news-media-description text-left',
}

const StoryContentChildAmpImage = props => {
  const { data } = props
  return (
    <>
      <Image
        width="100%"
        ImgTag="amp-img"
        className={classes.image}
        captionClassName={classes.description}
        sizePreset="large"
        {...data}
      />
    </>
  )
}

export default StoryContentChildAmpImage
