import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoriesAuthorChild from './_children/stories-author'
import StoryData from '../../../utilities/story-data'

const StoriesListAuthor = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      section = '',
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const storyObj = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  const storiesData = []
  const { content_elements: contentElements = [] } = data || {}
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
      multimediaLandscapeMD: storyObj.multimediaLandscapeMD,
      multimediaPortraitMD: storyObj.multimediaPortraitMD,
      multimediaLandscapeL: storyObj.multimediaLandscapeL,
      multimediaLazyDefault: storyObj.multimediaLazyDefault,
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
      isAdmin={isAdmin}
      section={section}
    />
  )
}

StoriesListAuthor.label = 'Listado de historias - autores'
StoriesListAuthor.static = true

StoriesListAuthor.propTypes = {
  customFields,
}

export default StoriesListAuthor
