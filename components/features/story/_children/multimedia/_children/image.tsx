import * as React from 'react'
import { FC } from 'types/features'

import Image from '../../../../../global-components/image'

const classes = {
  image: '__image w-full o-cover',
  imageBig: '__image--big',
  caption: '__caption',
}
interface FeatureProps {
  url?: string
  multimedia?: string
  caption?: string
  showCaption?: boolean
  primaryImage?: boolean
  completeImage?: boolean
  classImage?: string
  customWidth?: number
  customHeight?: number
}

const StoryContentChildImage: FC<FeatureProps> = ({
  url = '',
  multimedia,
  caption = '',
  showCaption = true,
  primaryImage = false,
  completeImage = false,
  classImage = 'story-contents',
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
