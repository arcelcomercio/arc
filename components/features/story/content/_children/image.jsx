import React from 'react'

import Image from '@arc-core-components/element_image'

const classes = {
  image: 'story-content__visual--image w-full h-full',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildImage = ({ data, imgTag, resizer = false }) => {
  const sizerImg = resizer ? 'original' : 'large'
  const ampClass = imgTag === 'amp-img' ? 'amp-' : ''
  return (
    <>
      <Image
        width="100%"
        layout="responsive"
        ImgTag={imgTag}
        imgClassName={classes.image}
        captionClassName={`${ampClass}${classes.caption}`}
        sizePreset={sizerImg}
        {...data}
      />
    </>
  )
}

export default StoryContentChildImage
