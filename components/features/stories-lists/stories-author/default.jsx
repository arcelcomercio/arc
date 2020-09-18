import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoriesAuthorChild from './_children/stories-author'
import StoryData from '../../../utilities/story-data'
import { defaultAuthorImage } from '../../../utilities/assets'
import {
  includePrimarySection,
  includeSections,
  includeCreditsRole,
  includeCreditsEducation,
  includeCredits,
} from '../../../utilities/included-fields'

const StoriesListAuthor = props => {
  const { arcSite, contextPath, deployment } = useAppContext()

  const presets = 'no-presets'
  const includedFields = `headlines.basic,subheadlines.basic,${includeCredits},credits.by.image.url,${includeCreditsEducation},${includeCreditsRole},websites.${arcSite}.website_url,${includePrimarySection},${includeSections}`

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      section = '',
      sectionLink = '',
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const storyObj = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  const storiesData = []
  const { content_elements: contentElements = [] } = data

  contentElements.forEach(el => {
    storyObj.__data = el
    storiesData.push({
      title: storyObj.title,
      websiteLink: storyObj.websiteLink,
      primarySection: storyObj.primarySection,
      primarySectionLink: storyObj.primarySectionLink,
      author: storyObj.author,
      authorLink: storyObj.authorLink,
      authorImage: storyObj.authorImage,
      authorOccupation: storyObj.authorOccupation,
      subTitle: storyObj.subTitle,
      multimediaType: storyObj.multimediaType,
    })
  })
  const storyFirst = storiesData.length > 0 ? storiesData[0] : []
  const storyList = storiesData.length > 1 ? storiesData.slice(1) : []
  return (
    <StoriesAuthorChild
      data={storyFirst}
      dataList={storyList}
      section={section}
      sectionLink={sectionLink}
      defaultAuthorImage={defaultAuthorImage(arcSite, contextPath)}
    />
  )
}

StoriesListAuthor.label = 'Listado de historias - autores'
StoriesListAuthor.static = true

StoriesListAuthor.propTypes = {
  customFields,
}

export default StoriesListAuthor
