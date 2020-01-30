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

const ExtraordinaryStoryBySection = props => {
  const { customFields } = props
  const { sectionName, positionData, showExtraordinaryStory } = customFields
  const { deployment, contextPath, arcSite } = useFusionContext()

  const data =
    useContent(
      showExtraordinaryStory
        ? {
            source: SOURCE,
            query: {
              section: sectionName,
              feedOffset: positionData || 0,
              presets:
                'landscape_xl:980x528,landscape_l:648x374,square_l:600x600',
              includedFields: `websites.${arcSite}.website_url,website,headlines.basic,subheadlines.basic,promo_items.basic_video._id,${includePromoItems},${includeCredits},${includePrimarySection}`,
            },
            filter: schemaFilter(arcSite),
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
