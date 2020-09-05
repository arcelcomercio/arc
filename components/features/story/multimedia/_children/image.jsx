import React from 'react'
import Static from 'fusion:static'
import { useAppContext } from 'fusion:context'

import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: '__image w-full o-cover',
  imageBig: '__image--big',
  caption: '__caption',
}

/**
 * Este componente es muy similar a
 * components/features/story/contents/_children/image.jsx
 * utilizado exclusivamente para la version lite.
 * Solo cambia el objeto de classes y una validacion para SITE_TROME.
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
  classImage = 'story-contents',
  presets = `landscape_md:314x157,story_small:482x290,large:${
    completeImage ? '980x528' : '580x330'
  }`,
}) => {
  const { arcSite } = useAppContext()
  const extractImage = urlImg =>
    createResizedParams({
      url: urlImg,
      presets,
      arcSite,
    }) || {}

  const renderCompleteImage = () => (
    /**
     * Si el contenido es tamano completo, la imagen es fluida,
     * no esta sujeta a la grilla normal de noticia,
     * por eso los breakpoints son diferentes.
     */
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
        className={`${classImage}${classes.image} ${classImage}${classes.imageBig}`}
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
          className={`${classImage}${classes.image}`}
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
          className={`lazy ${classImage}${classes.image}`}
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
            <figcaption className={`${classImage}${classes.caption}`}>
              {caption}{' '}
            </figcaption>
          )}
        </picture>
      </Static>
    </>
  )
}

export default React.memo(StoryContentChildImage)
