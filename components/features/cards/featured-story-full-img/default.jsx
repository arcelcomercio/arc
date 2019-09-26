import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeatureFullImageChild from './_children/feature-full-image'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const FeatureStoryFullImage = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      crossY,
      crossX,
      model,
      categoryField,
      titleField,
      imgField,
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    author,
    authorLink,
    primarySection,
    primarySectionLink,
    title: titleStory,
    multimediaLandscapeL,
    multimediaSquareXL,
    multimediaPortraitMD,
    multimediaLazyDefault,
    multimediaType,
    websiteLink,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const section = categoryField || primarySection
  const title = titleField || titleStory

  const params = {
    author,
    authorLink,
    primarySectionLink,
    title,
    multimediaLandscapeL: imgField || multimediaLandscapeL, //
    multimediaPortraitMD: imgField || multimediaPortraitMD, //
    multimediaSquareXL: imgField || multimediaSquareXL, //
    multimediaLazyDefault: imgField || multimediaLazyDefault,
    multimediaType,
    websiteLink,
    crossY,
    crossX,
    model,
    section,
    isAdmin,
  }

  return <FeatureFullImageChild {...params} />
}

FeatureStoryFullImage.propTypes = {
  customFields,
}

FeatureStoryFullImage.label = 'Destaque Full Imagen'
FeatureStoryFullImage.static = true

export default FeatureStoryFullImage
