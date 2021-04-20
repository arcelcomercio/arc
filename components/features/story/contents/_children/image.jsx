import * as React from 'react'

import Image from '../../../../global-components/image'

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
  url,
  multimedia,
  caption,
  showCaption = true,
  primaryImage = false,
  completeImage = false,
  // multimediaLarge,
  // presets
  customWidth = completeImage ? 980 : 580,
  customHeight = completeImage ? 528 : 330,
}) => {
  /**
   * Si el contenido es tamano completo, la imagen es fluida,
   * no esta sujeta a la grilla normal de noticia,
   * por eso los breakpoints son diferentes.
   */
  const sizes = completeImage
    ? `(max-width: 360px) 280px, (max-width: 768px) 482px, ${customWidth}px`
    : `(max-width: 360px) 280px, (max-width: 639px) 482px, ${customWidth}px`
  return (
    <figure>
      <Image
        src={multimedia || url}
        width={customWidth}
        height={customHeight}
        sizes={sizes}
        alt={caption}
        className={classes.image}
        loading={primaryImage ? 'auto' : 'lazy'}
      />
      {showCaption ? (
        <figcaption className={classes.caption}>{caption} </figcaption>
      ) : null}
    </figure>
  )
}

export default StoryContentChildImage
