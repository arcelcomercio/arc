import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image amp-img w-full h-full',
  description: 'story-content__news-media-description text-left pt-5',
}

const StoryContentChildAmpImage = ({ data, resizer = false }) => {
  const sizerImg = resizer ? 'original' : 'large'
  const patameters = {
    width: 800,
    height: 429,
    resized_urls: data.resized_urls,
    caption: data.caption,
    url: data.url,
    type: data.type,
    subtitle: data.subtitle,
  }
  return (
    <>
      <Image
        layout="responsive"
        ImgTag="amp-img"
        className={classes.image}
        captionClassName={classes.description}
        sizePreset={sizerImg}
        {...patameters}
      />
    </>
  )
}

export default StoryContentChildAmpImage
