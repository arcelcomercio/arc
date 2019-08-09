import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedStoryPremiumChild from './_children/feature-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const FeaturedStoryPremium = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      model,
      bgColor,
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}
  const {
    isPremium,
    websiteLink,
    multimediaSquareMD,
    multimediaLandscapeMD,
    multimediaLandscapeL,
    title,
    subTitle,
    author,
    authorLink,
    multimediaType,
    primarySectionLink,
    primarySection,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const params = {
    isPremium,
    model,
    bgColor,
    websiteLink,
    multimediaSquareMD,
    multimediaLandscapeMD,
    multimediaLandscapeL,
    title,
    subTitle,
    author,
    authorLink,
    multimediaType,
    primarySectionLink,
    primarySection,
  }
  return <FeaturedStoryPremiumChild {...params} />
}

FeaturedStoryPremium.propTypes = {
  customFields,
}

// FeaturedStoryPremium.static = true
FeaturedStoryPremium.label = 'Destaque Premium'
export default FeaturedStoryPremium
