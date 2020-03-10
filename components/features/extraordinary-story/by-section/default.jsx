import React, { useEffect } from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'

const SOURCE = 'story-by-section'
const PHOTO_SOURCE = 'photo-resizer'

const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

const ExtraordinaryStoryBySection = props => {
  const { customFields } = props
  const {
    sectionName,
    positionData,
    showExtraordinaryStory,
    multimediaSource,
  } = customFields
  const { deployment, contextPath, arcSite } = useFusionContext()

  const presets = 'landscape_xl:980x528,square_l:600x600'

  const data =
    useContent(
      showExtraordinaryStory
        ? {
            source: SOURCE,
            query: {
              section: sectionName,
              feedOffset: positionData || 0,
              presets,
              includedFields: `websites.${arcSite}.website_url,website,headlines.basic,subheadlines.basic,promo_items.basic_video._id,${includePromoItems},${includeCredits},${includePrimarySection}`,
            },
            filter: schemaFilter(arcSite),
          }
        : {}
    ) || {}

  // Solo acepta custom image desde Photo Center
  const photoId = multimediaSource ? getPhotoId(multimediaSource) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: multimediaSource,
              presets,
            },
          }
        : {}
    ) || {}

  useEffect(() => {
    if (window.powaBoot) {
      window.powaBoot()
    }
  }, [])

  const formattedData = new Data({
    data,
    deployment,
    contextPath,
    arcSite,
    customFields,
    defaultImgSize: 'md',
    customPhoto,
  })
  // this.isVideo = formattedData.isVideo
  const params = {
    data: formattedData,
    multimediaType: formattedData.multimediaType,
    multimediaOrientation: formattedData.multimediaOrientation,
    contentOrientation: formattedData.contentOrientation,
    deployment,
    contextPath,
    arcSite,
    showExtraordinaryStory,
  }
  return <ExtraordinaryStory {...params} />
}

ExtraordinaryStoryBySection.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryBySection.label = 'Apertura extraordinaria por sección'
ExtraordinaryStoryBySection.static = true

export default ExtraordinaryStoryBySection
