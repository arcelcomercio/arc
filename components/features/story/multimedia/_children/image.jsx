import * as React from 'react'

import Image from '../../../../global-components/image'

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
  url,
  multimedia,
  caption,
  showCaption = true,
  primaryImage = false,
  completeImage = false,
  classImage = 'story-contents',
  // multimediaLarge,
  // presets
}) => {
  const width = completeImage ? 980 : 580
  const height = completeImage ? 528 : 330
  /**
   * Si el contenido es tamano completo, la imagen es fluida,
   * no esta sujeta a la grilla normal de noticia,
   * por eso los breakpoints son diferentes.
   */
  const sizes = completeImage
    ? `(max-width: 360px) 314px, (max-width: 768px) 482px, ${width}px`
    : `(max-width: 360px) 314px, (max-width: 639px) 482px, ${width}px`

  return (
    <figure>
      <Image
        src={multimedia || url}
        width={width}
        height={height}
        sizes={sizes}
        alt={caption}
        className={
          completeImage
            ? `${classImage}${classes.image} ${classImage}${classes.imageBig}`
            : `${classImage}${classes.image}`
        }
        loading={primaryImage ? 'auto' : 'lazy'}
      />
      {showCaption ? (
        <figcaption className={`${classImage}${classes.caption}`}>
          {caption}{' '}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default React.memo(StoryContentChildImage)
