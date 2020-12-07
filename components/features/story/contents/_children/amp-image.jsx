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
      presets: 'medium:600x360',
      arcSite,
    }) || {}

  return (
    <>
      <figure className={classes.image}>
        <amp-img
          src={images && images.medium}
          alt={data.caption}
          height={360}
          layout="responsive"
          width={600}></amp-img>
        <figcaption className={classes.description}>{data.subtitle}</figcaption>
      </figure>
    </>
  )
}

export default StoryContentChildAmpImage
