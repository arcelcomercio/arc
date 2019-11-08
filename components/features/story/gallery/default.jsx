import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { defaultImage } from '../../../utilities/helpers'
import Infografia from '../contents/_children/html'
import StoryContentsChildMultimedia from '../contents/_children/multimedia'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full pl-20 pr-20',
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
    link,
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
    showCaption: false,
  }

  return (
    <>
      {contentElementGallery ? (
        <div className={classes.gallery}>
          {subtype === ConfigParams.GALLERY_VERTICAL ? (
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
      {subtype === ConfigParams.BIG_IMAGE ||
      subtype === ConfigParams.SPECIAL_BASIC ? (
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

export default StoryGallery
