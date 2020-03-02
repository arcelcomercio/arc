import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  GALLERY_VERTICAL,
  BIG_IMAGE,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import { getAssetsPath } from '../../../utilities/constants'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'
import Infografia from '../contents/_children/html'
import StoryContentsChildMultimedia from '../contents/_children/multimedia'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full pl-20 pr-20',
}

// Funcion extraida de Helpers
export const defaultImage = ({
  deployment,
  contextPath,
  arcSite,
  size = 'lg',
}) => {
  if (size !== 'lg' && size !== 'md' && size !== 'sm') return ''

  return deployment(
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/default-${size}.png`
  )
}

const StoryGallery = () => {
  const {
    arcSite,
    contextPath,
    deployment,
    globalContent: data,
    isAdmin,
    siteProperties: { siteUrl },
  } = useFusionContext()

  const {
    contentElementGallery,
    title,
    subTitle,
    websiteLink: link,
    subtype,
    promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
  } = new StoryData({
    data,
    contextPath,
  })
  const defaultImageGallery = defaultImage({
    deployment,
    contextPath,
    arcSite,
  })

  const parameters = {
    contentElementGallery,
    title,
    subTitle,
    link,
    isAdmin,
    siteUrl,
    arcSite,
    defaultImageGallery,
  }

  const {
    basic: { caption = '' } = {},
    infografia: { content: embedHtmlPromoItems = '' } = {},
  } = promoItems

  const parametersPromoItems = {
    ...promoItems,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    multimediaLazyDefault: defaultImageGallery,
  }

  return (
    <>
      {contentElementGallery ? (
        <div className={classes.gallery}>
          {subtype === GALLERY_VERTICAL ? (
            <StoryGalleryChildGallery {...parameters} />
          ) : (
            <StoryGalleryChildGallerySlider {...parameters} />
          )}
        </div>
      ) : (
        embedHtmlPromoItems && (
          <Infografia
            data={embedHtmlPromoItems}
            caption={caption}
            header="true"
          />
        )
      )}
      {subtype === BIG_IMAGE || subtype === SPECIAL_BASIC ? (
        <div className={classes.image}>
          <StoryContentsChildMultimedia data={parametersPromoItems} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

StoryGallery.label = 'Artículo - galería'
StoryGallery.static = true

export default StoryGallery
