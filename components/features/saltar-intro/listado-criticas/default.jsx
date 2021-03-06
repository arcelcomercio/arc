import * as React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import List from './_children/list'
import StoryData from '../../../utilities/story-data'
import {
  includeCredits,
  separatorBasicFields,
} from '../../../utilities/included-fields'

const SaltarIntroListadoCriticas = props => {
  const {
    customFields: {
      seeMoreLink,
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
    },
  } = props

  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const dataTransform = data => {
    const { content_elements: contentElements = [] } = data || {}

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

    return { data: newData }
  }

  const dataApi =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'landscape_s:296x158',
        includedFields: `${separatorBasicFields},${includeCredits}`,
      }),
      filter: schemaFilter(arcSite),
      transform: dataTransform,
    }) || {}

  const getDataComponent = () => {
    const { data } = dataApi
    const items = Object.values(data)
    return { items }
  }

  return <List data={getDataComponent()} {...{ isAdmin, seeMoreLink }} />
}

SaltarIntroListadoCriticas.propTypes = {
  customFields,
}

SaltarIntroListadoCriticas.label = 'Listado Críticas - Saltar Intro'
SaltarIntroListadoCriticas.static = true
export default SaltarIntroListadoCriticas
