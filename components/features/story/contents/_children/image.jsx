import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'

import { createResizedParams } from '../../../../utilities/resizer/resizer'
import { SITE_TROME } from '../../../../utilities/constants/sitenames'

const classes = {
  image: 'story-content__visual--image w-full ',
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

/**
 * Este componente es muy similar a
 * components/features/story/multimedia/_children/image.jsx
 * utilizado exclusivamente para la version lite.
 * Solo cambia el objeto de classes.
 */
const StoryContentChildImage = ({
  multimediaLarge,
  url,
  _id = 'image',
  multimediaLazyDefault,
  caption,
  showCaption = true,
  primaryImage = false,
  completeImage = false,
  presets = `landscape_md:314x157,story_small:482x290,large:${
    completeImage ? '980x528' : '580x330'
  }`,
}) => {
  const { arcSite } = useAppContext()
  const presetsTrome = `landscape_md:314x169,story_small:482x260,large:${
    completeImage ? '980x528' : '580x330'
  }`
  const extractImage = urlImg => {
    if (typeof window === 'undefined') {
      return (
        createResizedParams({
          url: urlImg,
          presets: arcSite === SITE_TROME ? presetsTrome : presets,
          arcSite,
        }) || {}
      )
    }
    return urlImg
  }

  const renderCompleteImage = () => (
    <>
      <source
        srcSet={extractImage(multimediaLarge || url).landscape_md}
        media="(max-width: 360px)"
      />
      <source
        srcSet={extractImage(multimediaLarge || url).story_small}
        media="(max-width: 768px)"
      />
      <img
        src={extractImage(multimediaLarge || url).large}
        alt={caption}
        className={classes.image}
        importance="high"
      />
    </>
  )

  const renderCommonImage = () =>
    primaryImage ? (
      // Si es la imagen principal no necesita lazyload
      <>
        <source
          srcSet={extractImage(multimediaLarge || url).landscape_md}
          media="(max-width: 360px)"
        />
        <source
          srcSet={extractImage(multimediaLarge || url).story_small}
          media="(max-width: 639px)"
        />
        <img
          src={extractImage(multimediaLarge || url).large}
          alt={caption}
          className={classes.image}
          importance="high"
        />
      </>
    ) : (
      // Si no es la imagen principal carga con lazyload
      <>
        <source
          srcSet={multimediaLazyDefault}
          data-srcset={extractImage(multimediaLarge || url).landscape_md}
          media="(max-width: 360px)"
          className="lazy"
        />
        <source
          srcSet={multimediaLazyDefault}
          data-srcset={extractImage(multimediaLarge || url).story_small}
          media="(max-width: 639px)"
          className="lazy"
        />
        <img
          src={multimediaLazyDefault}
          data-src={extractImage(multimediaLarge || url).large}
          alt={caption}
          className={`lazy ${classes.image}`}
          importance="low"
        />
      </>
    )

  return (
    <>
      <Static id={_id}>
        <picture>
          {completeImage ? renderCompleteImage() : renderCommonImage()}
          {showCaption && (
            <figcaption className={classes.caption}>{caption} </figcaption>
          )}
        </picture>
      </Static>
    </>
  )
}

export default StoryContentChildImage
