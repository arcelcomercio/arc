import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

import GalleryTitle from './_children/title'
import FullImage from './_children/full-image'
import {
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'

const classes = {
  boxContainer: 'photogallery col-3 pl-20 pb-20 pr-20',
}

const PhotogalleryFeat = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleCustom,
      seeMoreShow,
      seeMoreLink,
      textAlign,
      textPosition,
      textOrientation,
    } = {},
  } = props

  const presets = 'landscape_l:648x374,landscape_md:314x157,square_md:300x300'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includePrimarySection}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    quantityGalleryItem,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaLazyDefault,
    multimediaType,
    multimediaCaption,
    multimediaSubtitle,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
  })

  return (
    <div className={classes.boxContainer}>
      <GalleryTitle
        titleCustom={titleCustom}
        textAlign={textAlign}
        seeMoreShow={seeMoreShow}
        seeMoreLink={seeMoreLink}
      />
      <FullImage
        isAdmin={isAdmin}
        primarySection={primarySection}
        primarySectionLink={primarySectionLink}
        title={title}
        websiteLink={websiteLink}
        quantityGalleryItem={quantityGalleryItem}
        multimediaLandscapeL={multimediaLandscapeL}
        multimediaSquareXL={multimediaSquareXL}
        multimediaLazyDefault={multimediaLazyDefault}
        multimediaType={multimediaType}
        textAlign={textAlign}
        textPosition={textPosition}
        textOrientation={textOrientation}
        multimediaCaption={multimediaCaption}
        multimediaSubtitle={multimediaSubtitle}
      />
    </div>
  )
}

PhotogalleryFeat.propTypes = {
  customFields,
}

PhotogalleryFeat.label = 'Fotogalería - Beta'
PhotogalleryFeat.static = true

export default PhotogalleryFeat
