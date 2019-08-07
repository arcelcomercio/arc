import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import DestaquePremiumChild from './_children/destaque-premium'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../utilities/story-data'

const DestaquePremium = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()
  const { customFields: { path, model, bgColor } = {} } = props
  const contentSource = path.match(/noticia(\/)?$/)
    ? {
        source: 'story-by-url',
        query: { website_url: path },
        filter: schemaFilter(arcSite),
      }
    : {
        source: 'story-by-section',
        query: { section: path },
        filter: schemaFilter(arcSite),
      }

  const data = useContent({
    ...contentSource,
  })
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
  return <DestaquePremiumChild {...params} />
}

DestaquePremium.propTypes = {
  customFields,
}

DestaquePremium.label = 'Destaque Premium'
export default DestaquePremium
