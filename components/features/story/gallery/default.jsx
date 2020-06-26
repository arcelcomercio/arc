import React from 'react'

import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  GALLERY_VERTICAL,
  BIG_IMAGE,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'
import { defaultImage } from '../../../utilities/assets'

import StoryGalleryChildGallerySlider from './_children/gallery-slider'
import StoryGalleryChildGallery from './_children/gallery'
import Infografia from '../contents/_children/html'
import StoryContentsChildMultimedia from '../contents/_children/multimedia'

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
    isAdmin,
    siteProperties: { siteUrl },
    requestUri,
  } = useFusionContext()

  const {
    contentElementGallery,
    title,
    subTitle,
    websiteLink: link,
    subtype,
    promoItems,
    isPremium,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
  } = new StoryData({
    data,
    contextPath,
  })

  const defaultImageGallery = defaultImage({
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
      {isPremium &&
        SITE_ELCOMERCIO === arcSite &&
        requestUri.includes('/archivo-elcomercio/') && (
          <div className={classes.premiumWrapper}>
            <p itemProp="description" className={classes.premiumText}>
              Suscriptor Digital
            </p>
          </div>
        )}
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
