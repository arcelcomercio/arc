import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedMultimedia from './_children/featured-multimedia'
import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'

const CardFeaturedStoryMultimedia = props => {
  const { customFields: { section = '', freeHtml = '' } = {} } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data = useContent({
    source: 'story-by-section',
    query: { section },
  })

  const { section_name: sectionName = '' } = data || {}

  const {
    websiteLink,
    multimediaLandscapeMD,
    title,
    multimediaType,
    date,
    primarySectionLink,
    primarySection,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <FeaturedMultimedia
      {...{
        websiteLink,
        multimediaLandscapeMD,
        title,
        multimediaType,
        date,
        sectionName:
          section === '' || section === '/' ? primarySection : sectionName,
        section:
          section === '' || section === '/'
            ? primarySectionLink
            : `${section}/`,
        freeHtml,
      }}
    />
  )
}

CardFeaturedStoryMultimedia.label = 'Destaque multimedia'
CardFeaturedStoryMultimedia.static = true

CardFeaturedStoryMultimedia.propTypes = {
  customFields,
}

export default CardFeaturedStoryMultimedia
