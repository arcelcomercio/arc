import { useAppContext } from 'fusion:context'
import * as React from 'react'

import {
  BIG_IMAGE,
  GALLERY_VERTICAL,
  SPECIAL_BASIC,
} from '../../../utilities/constants/subtypes'
import StoryData from '../../../utilities/story-data'
import Infografia from '../multimedia/_children/html'
import StoryContentsChildMultimedia from '../multimedia/_children/multimedia'
import PremiumTag from '../title/_children/premium'
import StoryGalleryChildGallery from './_children/gallery-lite'
import StoryGalleryChildGallerySlider from './_children/gallery-slider-lite'

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
    requestUri,
    metaValue,
  } = useAppContext()

  const {
    contentElementGallery,
    subtype,
    promoItems,
    isPremium,
    multimedia,
    canonicalUrl,
  } = new StoryData({
    data,
    contextPath,
  })

  const sectionUrl = canonicalUrl?.split('/') || '/'
  const seccioPublicidad = sectionUrl[1]?.replace(/-/gm, '')

  const {
    basic: { caption = '' } = {},
    infografia: { content: embedHtmlPromoItems = '' } = {},
  } = promoItems

  const parametersPromoItems = {
    ...promoItems,
    multimedia,
    primaryImage: true,
    completeImage: true,
    classImage: 's-multimedia',
  }

  return (
    <>
      {metaValue('section_style') !== 'story-v2-standard' &&
        requestUri.includes('/archivo-elcomercio') && (
          <div className={classes.premiumBox}>
            <PremiumTag isPremium={isPremium} arcSite={arcSite} />
          </div>
        )}
      {contentElementGallery ? (
        <div className={classes.gallery}>
          {subtype === GALLERY_VERTICAL ? (
            <StoryGalleryChildGallery
              arcSite={arcSite}
              contentElementGallery={contentElementGallery}
              seccioPublicidad={seccioPublicidad}
            />
          ) : (
            <>
              <StoryGalleryChildGallerySlider
                contentElementGallery={contentElementGallery}
              />
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
      ) : null}
    </>
  )
}

StoryGalleryLite.label = 'Artículo - galería'
StoryGalleryLite.static = true

export default StoryGalleryLite
