import * as React from 'react'
import { FC } from 'types/features'

const classes = {
  image: '__image w-full o-cover',
  imageBig: '__image--big',
  caption: '__caption',
}
interface FeatureProps {
  id?: string
  url?: string
  multimediaLarge?: string
  multimediaLandscapeMD: string
  multimediaLandscapeS: string
  caption?: string
  showCaption?: boolean
  primaryImage?: boolean
  completeImage?: boolean
  classImage?: string
  customWidth?: number
  customHeight?: number
}

const StoryContentChildImage: FC<FeatureProps> = ({
  multimediaLarge,
  multimediaLandscapeMD,
  multimediaLandscapeS,
  caption = '',
  showCaption = true,
  classImage = 'story-contents',
}) => {
  /**
   * Si el contenido es tamano completo, la imagen es fluida,
   * no esta sujeta a la grilla normal de noticia,
   * por eso los breakpoints son diferentes. ss
   */

  const renderCompleteImage = () => (
    <>
      <source srcSet={multimediaLandscapeS} media="(max-width: 360px)" />
      <source srcSet={multimediaLandscapeMD} media="(max-width: 768px)" />
      <img
        src={multimediaLarge}
        alt={caption}
        className={classes.image}
        importance="high"
      />
    </>
  )

  return (
    <figure>
      <picture>{renderCompleteImage()}</picture>
      {showCaption ? (
        <figcaption className={`${classImage}${classes.caption}`}>
          {caption}{' '}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default React.memo(StoryContentChildImage)
