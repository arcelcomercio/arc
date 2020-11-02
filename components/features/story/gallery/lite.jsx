import React from 'react'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  GALLERY_VERTICAL,
  BIG_IMAGE,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import { defaultImage } from '../../../utilities/assets'

import StoryGalleryChildGallerySlider from './_children/gallery-slider-lite'
import StoryGalleryChildGallery from './_children/gallery-lite'
import Infografia from '../multimedia/_children/html'
import StoryContentsChildMultimedia from '../multimedia/_children/multimedia'
import PremiumTag from '../title/_children/premium'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full ',
  premiumBox: 'f f-center',
}

const StoryGalleryLite = () => {
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
    link,
    subtype,
    promoItems,
    isPremium,
    multimediaLandscapeMD,
    multimediaStorySmall,
    multimediaLarge,
    canonicalUrl,
  } = new StoryData({
    data,
    contextPath,
  })
  const defaultImageGallery = defaultImage({
    contextPath,
    arcSite,
  })

  const sectionUrl = canonicalUrl.split('/')
  const seccioPublicidad = sectionUrl[1].replace(/-/gm, '')

  const parameters = {
    contentElementGallery,
    title,
    subTitle,
    link,
    isAdmin,
    siteUrl,
    arcSite,
    defaultImageGallery,
    seccioPublicidad,
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
    primaryImage: true,
    completeImage: true,
    classImage: 's-multimedia',
  }

  return (
    <>
      {requestUri.includes('/archivo-elcomercio') && (
        <div className={classes.premiumBox}>
          <PremiumTag isPremium={isPremium} arcSite={arcSite} />
        </div>
      )}
      {contentElementGallery ? (
        <div className={classes.gallery}>
          {subtype === GALLERY_VERTICAL ? (
            <StoryGalleryChildGallery {...parameters} />
          ) : (
            <>
              <StoryGalleryChildGallerySlider {...parameters} />
              <div
                id="state"
                data-currentslider="1"
                data-translatex="0"
                data-slidewidth=""
                data-positionslide="0"
                data-dragflag="false"
                data-distdrag="0"
                data-limitdrag="50"
              />
            </>
          )}
        </div>
      ) : (
        embedHtmlPromoItems && (
          <Infografia
            data={embedHtmlPromoItems}
            caption={caption}
            header="true"
            classImage="s-multimedia"
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

StoryGalleryLite.label = 'Artículo - galería'
StoryGalleryLite.static = true

export default StoryGalleryLite
