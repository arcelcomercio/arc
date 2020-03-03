import React from 'react'
import Static from 'fusion:static'
import { useFusionContext } from 'fusion:context'

import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  image: 'story-content__visual--image w-full ',
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
          <source
            // className ? '' : 'lazy'}
            media="(max-width: 320px)"
            // srcSet ? ... : ...}
            srcSet={extractImage(slide.url).landscape_md}
            data-srcset={extractImage(slide.url).landscape_md}
          />
          <source
            // className ? '' : 'lazy'}
            media="(max-width: 769px)"
            // srcSet ? ... : ...}
            srcSet={extractImage(slide.url).story_small}
            data-srcset={extractImage(slide.url).story_small}
          />
          <img
            src={extractImage(slide.url).large}
            alt={slide.caption || slide.subtitle}
            className={` ${classes.image}`}
          />
        </picture>
      </Static>
    </>
  )
}

export default StoryHeaderChildPicture
