import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import Infografia from '../content/_children/html'

const classes = {
  gallery: 'w-full',
}

const StoryGallery = () => {
  const { contextPath, globalContent: data, isAdmin } = useFusionContext()

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

  const parameters = { contentElementGallery, title, subTitle, link, isAdmin }

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
    </>
  )
}

StoryGallery.label = 'Artículo - galería'

export default StoryGallery
