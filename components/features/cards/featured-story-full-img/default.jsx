import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeatureFullImageChild from './_children/feature-full-image'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { getPhotoId } from '../../../utilities/helpers'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includeCreditsImage,
} from '../../../utilities/included-fields'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_xl
    lazy_default  
  }
}`

const FeatureStoryFullImage = props => {
  const {
    customFields: {
      imgField,
      storyConfig: {
        crossY,
        crossX,
        model,
        categoryField,
        titleField,
        contentService = '',
        contentConfigValues = {},
      } = {},
    } = {},
  } = props

  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    editableField,
  } = useFusionContext()

  const presets =
    'landscape_l:648x374,portrait_md:314x374,square_xl:900x900,square_md:300x300'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includeCreditsImage},${includePrimarySection}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              _id: photoId,
            },
            filter: PHOTO_SCHEMA,
          }
        : {}
    ) || {}

  const {
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    title: titleStory,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaPortraitMD,
    multimediaLazyDefault,
    multimediaType,
    websiteLink,
    multimediaSubtitle,
    multimediaCaption,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const {
    resized_urls: {
      landscape_l: landscapeLCustom,
      lazy_default: lazyDefaultCustom,
      portrait_md: portraitMDCustom,
      square_xl: squareXLCustom,
    } = {},
  } = customPhoto || {}

  const params = {
    author,
    authorLink,
    primarySectionLink,
    title: titleField || titleStory,
    multimediaLandscapeL: landscapeLCustom || multimediaLandscapeL, //
    multimediaPortraitMD: portraitMDCustom || multimediaPortraitMD, //
    multimediaSquareXL: squareXLCustom || multimediaSquareXL, //
    multimediaLazyDefault: lazyDefaultCustom || multimediaLazyDefault,
    multimediaType,
    websiteLink,
    editableField,
    crossY,
    crossX,
    model,
    section: categoryField || primarySection,
    isAdmin,
    multimediaSubtitle,
    multimediaCaption,
  }

  return <FeatureFullImageChild {...params} />
}

FeatureStoryFullImage.propTypes = {
  customFields,
}

FeatureStoryFullImage.label = 'Destaque Full Imagen'
FeatureStoryFullImage.static = true

export default FeatureStoryFullImage
