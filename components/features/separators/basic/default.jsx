import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import SeparatorList from './_children/separator'
import StoryData from '../../../utilities/story-data'
import {
  includePromoItems,
  includePrimarySection,
} from '../../../utilities/included-fields'

const STORIES_QTY_DEFAULT = 4
const CONTENT_SOURCE = 'story-feed-by-section'
const DEFAULT_TITLE = 'Últimas noticias'

const SeparatorBasic = props => {
  const {
    customFields: {
      section,
      titleSeparator,
      titleLink,
      htmlCode,
      model,
      seeMore,
      seeMoreLink,
      textAling,
    },
  } = props

  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const dataApi = useContent({
    source: CONTENT_SOURCE,
    query: {
      section,
      stories_qty: STORIES_QTY_DEFAULT,
      presets: 'landscape_s:234x161,portrait_md:314x374',
      includedFields: `websites.${arcSite}.website_url,canonical_url,headlines.basic,${includePromoItems},${includePrimarySection}`,
    },
    filter: schemaFilter(arcSite),
    transform: data => {
      const {
        content_elements: contentElements = [],
        section_name: sectionName = '',
      } = data || {}

      const dataFormat = new StoryData({
        deployment,
        contextPath,
        arcSite,
      })

      const newData =
        contentElements.length > 0
          ? contentElements.map(story => {
              dataFormat.__data = story
              return { ...dataFormat.attributesRaw }
            })
          : []

      return { data: newData, sectionName }
    },
  })

  const getDataComponent = () => {
    const { data, sectionName } = dataApi
    const title =
      titleSeparator ||
      (sectionName === 'Sección' && DEFAULT_TITLE) ||
      sectionName ||
      DEFAULT_TITLE
    const items = Object.values(data)
    // const items = values.slice(0, getStoriesQty(isMobile, isTablet, 4, 4, 1))
    return { titleSeparator: title, arcSite, titleLink, htmlCode, items }
  }

  return (
    <SeparatorList
      data={getDataComponent()}
      {...{ isAdmin, model, seeMore, seeMoreLink, textAling }}
    />
  )
}

SeparatorBasic.propTypes = {
  customFields,
}

SeparatorBasic.label = 'Separador Básico'
SeparatorBasic.static = true

export default SeparatorBasic
