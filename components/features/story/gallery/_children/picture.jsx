import React from 'react'
import Static from 'fusion:static'
import { useFusionContext } from 'fusion:context'

import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  image: 'story-content__gallery-img w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryHeaderChildPicture = (slide = {}) => {
  const { arcSite } = useFusionContext()
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        getResizedUrl({
          url: slide.url,
          presets: 'landscape_md:314x157,story_small:482x290,large:980x528',
          arcSite,
        }) || {}
      )
    }
    return urlImg
  }

  return (
    <>
      <Static id={slide.i}>
        <picture>
          <img
            src={slide.defaultImageGallery}
            data-src={extractImage(slide.url).large}
            data-srcset={`
              ${extractImage(slide.url).landscape_md} 360w,
              ${extractImage(slide.url).story_small} 768w,
              ${extractImage(slide.url).large} 980w
            `}
            sizes='100vw'
            alt={slide.caption || slide.subtitle}
            className={`lazy ${classes.image}`}
          />
        </picture>
      </Static>
    </>
  )
}

export default StoryHeaderChildPicture
