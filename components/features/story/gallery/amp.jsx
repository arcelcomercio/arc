import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import React from 'react'

import { GALLERY_VERTICAL } from '../../../utilities/constants/subtypes'
import StoryData from '../../../utilities/story-data'
import StoryHeaderChildAmpGallery from './_children/amp-gallery'
import StoryHeaderChildAmpGallerySlider from './_children/amp-gallery-slider'

const classes = {
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  gallery: 'amp-sh bg-white w-full pr-20 pl-20 m-5 mx-auto',
}
const StoryGalleryAmp = () => {
  const { arcSite, contextPath, globalContent: data } = useFusionContext()

  const { siteUrl, adsAmp } = getProperties(arcSite)

  const {
    subtype,
    link,
    primarySectionLink,
    promoItems: {
      basic_gallery: { content_elements: galleryItems = [] } = {},
    } = {},
  } = new StoryData({
    data,
    contextPath,
  })

  return (
    <>
      {galleryItems && galleryItems[0] && (
        <div className={galleryItems ? classes.gallery : classes.stories}>
          {galleryItems && subtype === GALLERY_VERTICAL ? (
            <StoryHeaderChildAmpGallery
              data={galleryItems}
              primarySectionLink={primarySectionLink}
              adsAmp={adsAmp}
            />
          ) : (
            <StoryHeaderChildAmpGallerySlider
              data={galleryItems}
              link={link}
              siteUrl={siteUrl}
            />
          )}
        </div>
      )}
    </>
  )
}

StoryGalleryAmp.static = true

export default StoryGalleryAmp
