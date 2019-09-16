import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import DobleteCard from './_children/doblete-card'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'

const Doblete = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()
  const {
    customFields: {
      storyConfig: {
        contentService: contentService1 = '',
        contentConfigValues: contentConfigValues1 = {},
      } = {},
      storyConfig2: {
        contentService: contentService2 = '',
        contentConfigValues: contentConfigValues2 = {},
      } = {},
    } = {},
  } = props

  const getParams = data => {
    const {
      websiteLink,
      title,
      author,
      authorLink,
      primarySection,
      primarySectionLink,
    } = new StoryData({
      data,
      arcSite,
      contextPath,
      deployment,
      defaultImgSize: 'sm',
    })
    return {
      websiteLink,
      title,
      author,
      authorLink,
      primarySection,
      primarySectionLink,
    }
  }

  const data1 =
    useContent({
      source: contentService1,
      query: contentConfigValues1,
      filter: schemaFilter(arcSite),
    }) || {}

  const data2 =
    useContent({
      source: contentService2,
      query: contentConfigValues2,
      filter: schemaFilter(arcSite),
    }) || {}

  const params1 = getParams(data1)
  const params2 = getParams(data2)

  return (
    <div className="flex flex-col justify-between">
      <DobleteCard {...params1} />
      <DobleteCard {...params2} />
    </div>
  )
}

Doblete.propTypes = {
  customFields,
}

Doblete.label = 'Doblete'
export default Doblete
