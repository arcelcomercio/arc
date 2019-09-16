import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import Separator from './_children/separator'

const SeparatorStories = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleSeparator,
      titleLink,
      htmlCode,
      isThreeCol,
      isAuthorVisible,
    } = {},
  } = props

  const { arcSite, isAdmin, contextPath, deployment } = useFusionContext()

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  console.log('DATA--->', contentElements)
  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      title,
      websiteLink,
      multimediaLazyDefault,
      multimediaPortraitMD,
      multimediaLandscapeL,
      multimediaLandscapeS,
      multimediaType,
      author,
      authorLink,
    } = storyData
    return {
      title,
      websiteLink,
      multimediaLazyDefault,
      imageUrl:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeS,
      imageUrlMobile:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeL,
      multimediaType,
      author,
      authorLink,
    }
  })

  return (
    <Separator
      {...{
        isThreeCol,
        htmlCode,
        titleLink,
        titleSeparator,
        stories,
        isAuthorVisible,
        isAdmin,
      }}
    />
  )
}

SeparatorStories.label = 'Separador - noticias'
SeparatorStories.static = true

SeparatorStories.propTypes = {
  customFields,
}

export default SeparatorStories
