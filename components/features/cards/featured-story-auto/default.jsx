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
    editableField,
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
  const storiesSchema = `{ content_elements ${schema} }`

  const data = useContent({
    source: 'story-feed-by-section',
    query: {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      presets: 'mobile:314x157',
      includedFields: `websites.${arcSite}.website_url,${includePromoItems},headlines.basic,${includeCredits},${includePrimarySection}`,
    },
    filter: storiesSchema,
  })

  let customPhoto = {}
  if (imgField) {
    const photoId = getPhotoId(imgField)
    if (photoId) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      customPhoto = useContent({
        source: PHOTO_SOURCE,
        query: {
          _id: photoId,
        },
        filter: PHOTO_SCHEMA,
      })
    }
  }

  const { content_elements: contentElements = [] } = data || {}

  const formattedData = storyFormatter.formatStory(
    contentElements[0],
    imgField,
    customPhoto
  )

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
    editableField,
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
