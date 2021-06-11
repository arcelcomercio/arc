import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { FC } from 'types/features'
import { EmbedConfig, PromoItems } from 'types/story'

import {
  BIG_IMAGE,
  GALLERY_VERTICAL,
  SPECIAL_BASIC,
} from '../../../../utilities/constants/subtypes'
import PremiumTag from '../../title/_children/premium'
import Infografia from '../multimedia/_children/html'
import StoryContentsChildMultimedia from '../multimedia/_children/multimedia'
import StoryGalleryChildGallery from './_children/gallery-lite'
import StoryGalleryChildGallerySlider from './_children/gallery-slider-lite'

const classes = {
  gallery: 'w-full',
  image: 'story-gallery__img-box w-full ',
  premiumBox: 'f f-center',
}

interface FeatureProps {
  subtype: string
  multimedia: string
  canonicalUrl: string
  isPremium: boolean
  promoItems: PromoItems
  primarySection?: string
  promoItemJwplayer: EmbedConfig
}

const StoryChildrenGalleryLite: FC<FeatureProps> = (props) => {
  const { arcSite, requestUri } = useAppContext()

  const {
    subtype,
    canonicalUrl = '',
    multimedia = '',
    isPremium,
    promoItems,
    primarySection = '',
    promoItemJwplayer,
  } = props

  const contentElementGallery = promoItems?.basic_gallery?.content_elements
  const caption = promoItems?.basic?.caption || ''
  const embedHtmlPromoItems = promoItems?.infografia?.content

  const sectionUrl = canonicalUrl.split('/')
  const seccioPublicidad = sectionUrl[1] && sectionUrl[1].replace(/-/gm, '')

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
            <StoryGalleryChildGallery
              arcSite={arcSite}
              promoItems={promoItems}
              seccioPublicidad={seccioPublicidad}
            />
          ) : (
            <>
              <StoryGalleryChildGallerySlider promoItems={promoItems} />
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
            embedHtml={embedHtmlPromoItems}
            caption={caption}
            header
            classImage="s-multimedia"
          />
        )
      )}
      {subtype === BIG_IMAGE || subtype === SPECIAL_BASIC ? (
        <div className={classes.image}>
          <StoryContentsChildMultimedia
            multimedia={multimedia}
            primarySection={primarySection}
            promoItems={promoItems}
            promoItemJwplayer={promoItemJwplayer}
            classImage="s-multimedia"
            showCaption
            primaryImage
            completeImage
            lite
          />
        </div>
      ) : null}
    </>
  )
}

StoryChildrenGalleryLite.label = 'Artículo - galería'

export default StoryChildrenGalleryLite
