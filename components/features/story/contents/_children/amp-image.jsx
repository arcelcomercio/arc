import { useFusionContext } from 'fusion:context'
import React from 'react'

import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: 'story-content__visual--image amp-img w-full h-full',
  description: 'story-content__news-media-description text-left pt-5 line-h-xs',
}

const StoryContentChildAmpImage = ({ data }) => {
  const { arcSite, requestUri } = useFusionContext()

  const isStory = /^\/.*\/.*-noticia/.test(requestUri)
  const hasImpresa =
    (arcSite === 'depor' ||
      arcSite === 'trome' ||
      arcSite === 'peru21' ||
      arcSite === 'ojo') &&
    /^\/impresa\//.test(requestUri)
  const widthSizeTrome = arcSite === 'trome' ? 600 : 420
  const heightSizeTrome = arcSite === 'trome' ? 360 : 250
  const widthSize = isStory && hasImpresa ? 560 : widthSizeTrome
  const heightSize = isStory && hasImpresa ? 586 : heightSizeTrome

  const images =
    createResizedParams({
      url: data.url,
      presets: `medium:${widthSize}x${heightSize}`,
      arcSite,
    }) || {}

  return (
    <>
      <figure className={classes.image}>
        <amp-img
          src={images && images.medium}
          alt={data.caption}
          height={heightSize}
          layout="responsive"
          width={widthSize}
        />
        <figcaption className={classes.description}>{data.caption}</figcaption>
      </figure>
    </>
  )
}

export default StoryContentChildAmpImage
