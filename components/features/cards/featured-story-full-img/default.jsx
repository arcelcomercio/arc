/* eslint-disable react/jsx-props-no-spreading */
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import { getPhotoId } from '../../../utilities/helpers'
import {
  includeCredits,
  includeCreditsImage,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import FeatureFullImageChild from './_children/feature-full-image'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const PHOTO_SOURCE = 'photo-resizer'

const FeatureStoryFullImage = (props) => {
  const {
    customFields: {
      imgField,
      imgFieldCustom,
      crossY,
      crossX,
      model,
      categoryField,
      titleField,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  let presets = ''

  if (imgFieldCustom) {
    presets = `landscape_l:375x258,portrait_md:314x374,square_xl:${imgFieldCustom}`
  } else {
    presets = 'landscape_l:648x374,portrait_md:314x374,square_xl:647x767'
  }

  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includeCreditsImage},${includePrimarySection(
    { arcSite }
  )}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  // Solo acepta custom image desde Photo Center
  const photoId = imgField ? getPhotoId(imgField) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: imgField,
              presets,
            },
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
