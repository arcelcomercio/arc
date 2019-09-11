import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'
import FeaturedAuthor from './_children/featured-author'

const CardFeaturedStoryAuthor = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      design = 'first',
      sectionField = '',
      titleField = '',
      subTitleField = '',
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    title,
    websiteLink,
    primarySection,
    primarySectionLink,
    author,
    authorLink,
    authorImage,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaLandscapeL,
    multimediaLazyDefault,
    authorOccupation,
    subTitle,
    multimediaType,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <FeaturedAuthor
      {...{
        title: titleField || title,
        websiteLink,
        primarySection: sectionField || primarySection,
        primarySectionLink,
        author,
        authorLink,
        authorImage,
        multimediaLandscapeMD,
        multimediaPortraitMD,
        multimediaLandscapeL,
        multimediaLazyDefault,
        authorOccupation,
        subTitle: subTitleField || subTitle,
        multimediaType,
        design,
        isAdmin,
      }}
    />
  )
}

CardFeaturedStoryAuthor.label = 'Destaque de autor'
CardFeaturedStoryAuthor.static = true

CardFeaturedStoryAuthor.propTypes = {
  customFields,
}

export default CardFeaturedStoryAuthor
