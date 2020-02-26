import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import { getPhotoId } from '../../../utilities/helpers'
import { featuredStoryFields } from '../../../utilities/included-fields'

const PHOTO_SOURCE = 'photo-resizer'

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
  const includedFields = featuredStoryFields

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
