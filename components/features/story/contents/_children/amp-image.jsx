import React from 'react'
import { useFusionContext } from 'fusion:context'
import { createResizedParams } from '../../../../utilities/resizer/resizer'

const classes = {
  image: 'story-content__visual--image amp-img w-full h-full',
  description: 'story-content__news-media-description text-left pt-5 line-h-xs',
}

const StoryContentChildAmpImage = ({ data }) => {
  const { arcSite } = useFusionContext()
  const images =
    createResizedParams({
      url: data.url,
      presets: 'small:330x178,medium:560x315,large:1024x612',
      arcSite,
    }) || {}

  const parametersImages = {
    original: images.original,
    large: `${images.large} 1024w,${images.medium} 600w,${images.small} 360w`,
  }

  const patameters = {
    width: 600,
    height: 360,
    resized_urls: parametersImages || {},
    caption: data.caption,
    url: data.url,
    type: data.type,
    subtitle: data.subtitle,
  }

  return (
    <>
      <figure className={classes.image}>
        <amp-img
          srcset={parametersImages && parametersImages.large}
          alt={data.caption}
          sizes="(max-width: 360px) 50vw,(max-width: 750px) 50vw"
          height={patameters.height}
          width={patameters.width}></amp-img>
        <figcaption className={classes.description}>{data.subtitle}</figcaption>
      </figure>
    </>
  )
}

export default StoryContentChildAmpImage
