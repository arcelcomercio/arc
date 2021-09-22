import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import {
  includeCredits,
  separatorBasicFields,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import List from './_children/list'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const SaltarIntroListado = (props) => {
  const {
    customFields: {
      seeMoreLink,
      interviewed,
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
    },
  } = props

  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const dataTransform = (data) => {
    const { content_elements: contentElements = [] } = data || {}

    const dataFormat = new StoryData({
      deployment,
      contextPath,
      arcSite,
    })

    const newData =
      contentElements.length > 0
        ? contentElements.map((story) => {
            dataFormat.__data = story
            return { ...dataFormat.attributesRaw }
          })
        : []

    return { data: newData }
  }

  const dataApi =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'landscape_s:280x150',
        includedFields: `${separatorBasicFields},${includeCredits},display_date,publish_date`,
      }),
      filter: schemaFilter(arcSite),
      transform: dataTransform,
    }) || {}

  const getDataComponent = () => {
    const { data } = dataApi
    const items = Object.values(data)
    return { items }
  }

  return (
    <List
      data={getDataComponent()}
      {...{ isAdmin, seeMoreLink, interviewed }}
    />
  )
}

SaltarIntroListado.propTypes = {
  customFields,
}

SaltarIntroListado.label = 'Listado - Saltar Intro'
SaltarIntroListado.static = true
export default SaltarIntroListado
