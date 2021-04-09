import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

// import FeaturedStory from '../../../global-components/featured-story'
import FeaturedStory from './_children/destaque'
import schemaFilter from '../../../global-components/featured-story/schema-filter'

import StoryData from '../../../utilities/story-data'
import { featuredStoryFields } from '../../../utilities/included-fields'

import customFields from './_dependencies/custom-fields'

const CardFeaturedStoryAdvanced = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      starField,
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useAppContext()

  const { siteName } = getProperties(arcSite)
  const includedFields = featuredStoryFields

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'no-presets',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

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

  return (
    <>
      {(() => {
        return (
          <FeaturedStory
            primarySection={primarySection}
            primarySectionLink={primarySectionLink}
            title={title}
            websiteLink={websiteLink}
            author={author}
            authorLink={authorLink}
            multimediaType={multimediaType}
            multimediaCaption={multimediaCaption}
            multimedia={multimedia}
            arcSite={arcSite}
            siteName={siteName}
            starField={starField}
          />
        )
      })()}
    </>
  )
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque - Saltar Intro'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
