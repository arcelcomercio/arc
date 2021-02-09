import * as React from 'react'
import { useAppContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import getProperties from 'fusion:properties'

import FeaturedStory from '../../../global-components/featured-story'
import schemaFilter from '../../../global-components/featured-story/schema-filter'

import StoryData from '../../../utilities/story-data'
import { featuredStoryFields } from '../../../utilities/included-fields'

import customFields from './_dependencies/custom-fields'

const CardFeaturedStoryAuto = props => {
  const {
    customFields: {
      imgField,
      section,
      storyNumber,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
    } = {},
  } = props

  const {
    arcSite,
    deployment,
    contextPath,
  } = useAppContext()

  const { siteName = '' } = getProperties(arcSite)
  const includedFields = featuredStoryFields

  const data = useContent({
    source: 'story-by-section',
    query: {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      presets: 'no-presets',
      includedFields,
    },
    filter: schemaFilter(arcSite),
  })

  const {
    primarySection,
    primarySectionLink,
    title,
    websiteLink,
    author,
    authorLink,
    multimediaType,
    multimediaCaption,
    multimedia,
  } = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
  })

  return <FeaturedStory
    primarySection={primarySection}
    primarySectionLink={primarySectionLink}
    title={title}
    websiteLink={websiteLink}
    author={author}
    authorLink={authorLink}
    multimediaType={multimediaType}
    multimediaCaption={multimediaCaption}
    multimedia={imgField || multimedia}
    imageSize={imageSize}
    headband={headband}
    size={size}
    hightlightOnMobile={hightlightOnMobile}
    titleField={titleField}
    categoryField={categoryField}
    arcSite={arcSite}
    siteName={siteName}
  />
}

CardFeaturedStoryAuto.propTypes = {
  customFields,
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'
CardFeaturedStoryAuto.static = true

export default CardFeaturedStoryAuto
