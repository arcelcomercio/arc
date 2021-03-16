import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import SeparatorList from './_children/separator'
import StoryData from '../../../utilities/story-data'
import { separatorBasicFields } from '../../../utilities/included-fields'

const STORIES_QTY_DEFAULT = 3
const CONTENT_SOURCE = 'story-feed-by-section'
const DEFAULT_TITLE = ''

const SeparatorSaltarIntro = props => {
  const {
    customFields: { section, titleSeparator, titleLink, seeMoreLink, modeStreaming = false },
  } = props

  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const dataTransform = data => {
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
  }

  const dataApi = useContent({
    source: CONTENT_SOURCE,
    query: {
      section,
      stories_qty: STORIES_QTY_DEFAULT,
      presets: 'landscape_s:298x156',
      includedFields: separatorBasicFields,
    },
    filter: schemaFilter(arcSite),
    transform: dataTransform,
  })

  const getDataComponent = () => {
    const { data, sectionName } = dataApi
    const title =
      titleSeparator ||
      (sectionName === 'Sección' && DEFAULT_TITLE) ||
      sectionName ||
      DEFAULT_TITLE
    const items = Object.values(data)
    return { titleSeparator: title, arcSite, titleLink, items }
  }

  return (
    <SeparatorList data={getDataComponent()} {...{ isAdmin, seeMoreLink, modeStreaming }} />
  )
}

SeparatorSaltarIntro.propTypes = {
  customFields,
}

SeparatorSaltarIntro.label = 'Separador - Saltar Intro'
SeparatorSaltarIntro.static = true

export default SeparatorSaltarIntro
