import React from 'react'
import Static from 'fusion:static'
import { useFusionContext } from 'fusion:context'

import { getResizedUrl } from '../../../../utilities/resizer'

const classes = {
  image: 'story-content__visual--image w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildImage = ({
  multimediaLandscapeMD,
  multimediaStorySmall,
  multimediaLarge,
  multimediaLazyDefault,
  caption,
  showCaption = true,
  primaryImage = false,
}) => {
  const { arcSite } = useFusionContext()
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        getResizedUrl({
          url: urlImg,
          presets: 'landscapeMd:314x157,storySmall:482x290,large:980x528',
          arcSite,
        }) || {}
      )
    }
    return urlImg
  }

  return (
    <>
      <Static id="image">
        <picture>
          {primaryImage ? (
            <>
              <source
                srcSet={extractImage(multimediaLandscapeMD).landscapeMd}
                media="(max-width: 320px)"
              />
              <source
                srcSet={extractImage(multimediaStorySmall).storySmall}
                media="(max-width: 767px)"
              />
              <img
                src={extractImage(multimediaLarge).large}
                alt={caption}
                className={classes.image}
              />
            </>
          ) : (
            <>
              <source
                srcSet={multimediaLazyDefault}
                data-srcset={extractImage(multimediaLandscapeMD).landscapeMd}
                media="(max-width: 320px)"
                className="lazy"
              />
              <source
                srcSet={multimediaLazyDefault}
                data-srcset={extractImage(multimediaStorySmall).storySmall}
                media="(max-width: 767px)"
                className="lazy"
              />
              <img
                className={`${classes.image} lazy`}
                src={multimediaLazyDefault}
                data-src={extractImage(multimediaLarge).large}
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
