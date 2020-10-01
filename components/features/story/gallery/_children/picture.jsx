import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'

import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: 'story-content__gallery-img w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryHeaderChildPicture = (slide = {}) => {
  const { arcSite } = useAppContext()
  const imageVertical = 'landscape_md:314x,story_small:482x,large:980x'
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        createResizedParams({
          url: slide.url,
          presets: slide.itemv ? imageVertical : imageVertical,
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
          {slide.i === 0 ? (
            <>
              <source
                srcSet={extractImage(slide.url).landscape_md}
                media="(max-width: 360px)"
              />
              <source
                srcSet={extractImage(slide.url).story_small}
                media="(max-width: 768px)"
              />
              <img
                src={extractImage(slide.url).large}
                alt={slide.caption || slide.subtitle}
                className={classes.image}
                importance="high"
              />
            </>
          ) : (
            <>
              <source
                srcSet={slide.defaultImageGallery}
                data-srcset={extractImage(slide.url).landscape_md}
                media="(max-width: 360px)"
                className="lazy"
              />
              <source
                srcSet={slide.defaultImageGallery}
                data-srcset={extractImage(slide.url).story_small}
                media="(max-width: 768px)"
                className="lazy"
              />
              <img
                src={slide.defaultImageGallery}
                data-src={extractImage(slide.url).large}
                alt={slide.caption || slide.subtitle}
                className={`lazy ${classes.image}`}
                importance="low"
              />
            </>
          )}
        </picture>
      </Static>
    </>
  )
}

export default StoryHeaderChildPicture
