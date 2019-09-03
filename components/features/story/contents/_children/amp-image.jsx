import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image ',
  description: 'story-content__news-media-description text-left',
}

const StoryContentChildAmpImage = ({ data, resizer = false }) => {
  const sizerImg = resizer ? 'original' : 'large'

  return (
    <>
      <Image
        width="100%"
        ImgTag="amp-img"
        className={classes.image}
        captionClassName={classes.description}
        sizePreset={sizerImg}
        {...data}
      />
    </>
  )
}

export default StoryContentChildAmpImage
