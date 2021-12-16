import { useFusionContext } from 'fusion:context'
import React from 'react'

import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: 'story-content__visual--image amp-img pl-20 pr-20',
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
  let imagesAmp = ''

  if (arcSite !== 'trome') {
    imagesAmp =
      createResizedParams({
        url: data.url,
        presets: `image1:420x280,image2:768x512,image3:992x661,image4:1200x800,image5:1440x960`,
        arcSite,
      }) || {}
  }
  return (
    <>
      <figure className={classes.image}>
        {arcSite !== 'trome' ? (
          <amp-img
            src={imagesAmp && `${imagesAmp.image1} 420w`}
            alt={data.caption}
            height="800"
            width="1202"
            srcSet={
              imagesAmp &&
              `${imagesAmp.image1} 420w,${imagesAmp.image2} 768w,${imagesAmp.image3} 992w,${imagesAmp.image4} 1200w,${imagesAmp.image5} 1440w`
            }
            layout="responsive"
            data-hero="true"
          />
        ) : (
          <>
            <amp-img
              src={images && images.medium}
              alt={data.caption}
              height={heightSize}
              layout="responsive"
              width={widthSize}
            />
          </>
        )}
        <figcaption className={classes.description}>{data.caption}</figcaption>
      </figure>
    </>
  )
}

export default StoryContentChildAmpImage
