import React from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StoryHeaderChildAmpGallery from './_children/amp-gallery'
import StoryHeaderChildAmpGallerySlider from './_children/amp-gallery-slider'
import StoryData from '../../../utilities/story-data'
import { GALLERY_VERTICAL } from '../../../utilities/constants/subtypes'

const classes = {
  stories: 'amp-sh bg-white pr-20 pl-20 m-5 mx-auto',
  gallery: 'amp-sh bg-white w-full pr-20 pl-20 m-5 mx-auto',
}
const StoryGalleryAmp = () => {
  const { arcSite, contextPath, globalContent: data } = useFusionContext()

  const { siteUrl } = getProperties(arcSite)

  const {
    subtype,
    link,
    displayDate,
    author,
    authorLink,
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
              displayDate={displayDate}
              author={author}
              authorLink={authorLink}
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
