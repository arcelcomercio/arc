import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import { getPhotoId } from '../../../utilities/helpers'
import {
  includeCredits,
  includePromoItems,
  includePrimarySection,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_s 
    lazy_default  
  }
}`

const CardFeaturedStoryAuto = () => {
  const {
    arcSite,
    deployment,
    contextPath,
    isAdmin,
    customFields: {
      imgField,
      section,
      storyNumber,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
    } = {},
  } = useFusionContext()

  const { siteName = '' } = getProperties(arcSite)

  const storyFormatter = new StoryFormatter({
    deployment,
    contextPath,
    arcSite,
  })

  const { schema } = storyFormatter
  const presets =
    'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection},${includeSections},publish_date,display_date`

  const data = useContent({
    source: 'story-by-section',
    query: {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      presets,
      includedFields,
    },
    filter: schema,
  })

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

  const formattedData = storyFormatter.formatStory(data, imgField, customPhoto)

  const {
    category,
    title,
    author,
    multimediaLandscapeL,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaSquareS,
    multimediaLazyDefault,
    multimediaType,
    multimediaSubtitle,
    multimediaCaption,
  } = formattedData

  const params = {
    title,
    category,
    author,
    multimediaLandscapeL,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaSquareS,
    multimediaLazyDefault,
    imageSize,
    headband,
    size,
    hightlightOnMobile,
    titleField,
    categoryField,
    arcSite,
    multimediaType,
    isAdmin,
    siteName,
    multimediaSubtitle,
    multimediaCaption,
  }
  return <FeaturedStory {...params} />
}

CardFeaturedStoryAuto.propTypes = {
  customFields,
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'
CardFeaturedStoryAuto.static = true

export default CardFeaturedStoryAuto
