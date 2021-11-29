import { useAppContext } from 'fusion:context'
import * as React from 'react'

import Image from '../../../../global-components/image'

const classes = {
  image: '__image w-full o-cover',
  imageBig: '__image--big',
  caption: '__caption',
  authorName: '__author-name',
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
  authorName,
  showCaption = true,
  primaryImage = false,
  completeImage = false,
  classImage = 'story-contents',
  // multimediaLarge,
  // presets
  customWidth = completeImage ? 980 : 580,
  customHeight = completeImage ? 528 : 330,
}) => {
  /**
   * Si el contenido es tamano completo, la imagen es fluida,
   * no esta sujeta a la grilla normal de noticia,
   * por eso los breakpoints son diferentes. ss
   */
  const sizes = completeImage
    ? `(max-width: 360px) 280px, (max-width: 768px) 482px, ${customWidth}px`
    : `(max-width: 360px) 280px, (max-width: 639px) 482px, ${customWidth}px`

  const { metaValue } = useAppContext()
  const inlineStyles =
    metaValue('section_style') === 'story-v2-standard'
      ? {
          paddingBottom: `${(customHeight * 100) / customWidth}%`,
          height: 0,
          overflow: 'hidden',
          display: 'block',
        }
      : {}

  return (
    <figure>
      <Image
        src={multimedia || url}
        width={customWidth}
        height={customHeight}
        sizes={sizes}
        alt={caption}
        className={
          completeImage
            ? `${classImage}${classes.image} ${classImage}${classes.imageBig}`
            : `${classImage}${classes.image}`
        }
        loading={primaryImage ? 'auto' : 'lazy'}
        pictureStyle={inlineStyles}
      />
      {showCaption ? (
        <figcaption className={`${classImage}${classes.caption}`}>
          {caption}
          {' / '}
          <span className={`${classImage}${classes.authorName}`}>
            {authorName}
          </span>
        </figcaption>
      ) : null}
    </figure>
  )
}

export default React.memo(StoryContentChildImage)
