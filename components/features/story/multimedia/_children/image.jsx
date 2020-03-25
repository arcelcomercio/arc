import React from 'react'
import Static from 'fusion:static'
import { useFusionContext } from 'fusion:context'

import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  image: 'story-multimedia__image w-full',
  caption: 'story-multimedia__caption',
}

const StoryContentChildImage = ({
  multimediaLarge,
  url,
  _id = 'image',
  multimediaLazyDefault,
  caption,
  showCaption = true,
  primaryImage = false,
  presets = 'landscapeMd:314x157,storySmall:482x290,large:980x528',
}) => {
  const { arcSite } = useFusionContext()
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        getResizedUrl({
          url: urlImg,
          presets,
          arcSite,
        }) || {}
      )
    }
    return urlImg
  }

  return (
    <>
      <Static id={_id}>
        <picture>
          {primaryImage ? (
            <>
              <source
                srcSet={extractImage(multimediaLarge || url).landscapeMd}
                media="(max-width: 320px)"
              />
              <source
                srcSet={extractImage(multimediaLarge || url).storySmall}
                media="(max-width: 767px)"
              />
              <img
                src={extractImage(multimediaLarge || url).large}
                alt={caption}
                className={classes.image}
              />
            </>
          ) : (
            <>
              <source
                srcSet={multimediaLazyDefault}
                data-srcset={extractImage(multimediaLarge || url).landscapeMd}
                media="(max-width: 320px)"
                className="lazy"
              />
              <source
                srcSet={multimediaLazyDefault}
                data-srcset={extractImage(multimediaLarge || url).storySmall}
                media="(max-width: 767px)"
                className="lazy"
              />
              <img
                className={`${classes.image} lazy`}
                src={multimediaLazyDefault}
                data-src={extractImage(multimediaLarge || url).large}
                alt={caption}
              />
            </>
          )}

          {showCaption && (
            <figcaption className={classes.caption}>{caption} </figcaption>
          )}
        </picture>
      </Static>
    </>
  )
}

export default StoryContentChildImage
