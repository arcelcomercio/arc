import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import Infografia from '../contents/_children/html'
import StoryContentsChildMultimedia from '../contents/_children/multimedia'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full pl-20 pr-20',
}

const StoryGallery = () => {
  const {
    contextPath,
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
  } = new StoryData({
    data,
    contextPath,
  })

  const parameters = {
    contentElementGallery,
    title,
    subTitle,
    link,
    isAdmin,
    siteUrl,
  }

  const {
    basic: { caption = '' } = {},
    infografia: { content: embedHtmlPromoItems = '' } = {},
  } = promoItems

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
          <StoryContentsChildMultimedia data={promoItems} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

StoryGallery.label = 'Artículo - galería'

export default StoryGallery
