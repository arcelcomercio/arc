import * as React from 'react'
import { usepAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  GALLERY_VERTICAL,
  BIG_IMAGE,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'

import StoryContentsChildMultimedia from '../contents/_children/multimedia'
import Infografia from '../contents/_children/html'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full pl-20 pr-20',
  premiumWrapper: `premium__wrapper bg-primary flex justify-center items-center mb-10 ml-20 md:ml-0`,
  premiumText:
    'premium__text flex justify-center items-center text-black font-bold icon-padlock',
}

const StoryGallery = () => {
  const {
    arcSite,
    contextPath,
    globalContent: data,
    requestUri,
  } = usepAppContext()

  const {
    contentElementGallery,
    subtype,
    promoItems,
    isPremium,
    multimedia,
  } = new StoryData({
    data,
    contextPath,
  })

  const {
    basic: { caption = '' } = {},
    infografia: { content: embedHtmlPromoItems = '' } = {},
  } = promoItems

  const parametersPromoItems = {
    ...promoItems,
    multimedia,
    primaryImage: true,
    completeImage: true,
  }

  return (
    <>
      {isPremium &&
      SITE_ELCOMERCIO === arcSite &&
      requestUri.includes('/archivo-elcomercio/') ? (
        <div className={classes.premiumWrapper}>
          <p itemProp="description" className={classes.premiumText}>
            Suscriptor Digital
          </p>
        </div>
      ) : null}
      {contentElementGallery ? (
        <div className={classes.gallery}>
          {subtype === GALLERY_VERTICAL ? (
            <StoryGalleryChildGallery
              contentElementGallery={contentElementGallery}
            />
          ) : (
            <StoryGalleryChildGallerySlider
              contentElementGallery={contentElementGallery}
            />
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
      ) : null}
    </>
  )
}

StoryGallery.label = 'Artículo - galería'
StoryGallery.static = true

export default StoryGallery
