import React from 'react'
import { useFusionContext } from 'fusion:context'
import Image from '@arc-core-components/element_image'
import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: 'story-content__visual--image amp-img w-full h-full',
  description: 'story-content__news-media-description text-left pt-5',
}

const StoryContentChildAmpImage = ({ data, resizer = false }) => {
  const { arcSite } = useFusionContext()
  const sizerImg = resizer ? 'original' : 'large'
  const patameters = {
    width: 800,
    height: 429,
    resized_urls:
      createResizedParams({
        url: data.url,
        presets: 'large:980x528',
        arcSite,
      }) || {},
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
