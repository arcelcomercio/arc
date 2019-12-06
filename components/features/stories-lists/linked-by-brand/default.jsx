import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

import StoriesListLinkedByBrandChild from './_children/linked-by-brand'

const StoriesListLinkedByBrand = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props
  /**
   * TODO: Se podria agregar caso por defecto para que haga fetch
   * de las ultimas notas de Mag o del sitio actual.
   */
  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}
  const { content_elements: contentElements = [] } = data || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      title,
      websiteLink,
      multimediaLazyDefault,
      multimediaSquareS,
      multimediaLandscapeS,
    } = storyData
    return {
      title,
      websiteLink,
      multimediaLazyDefault,
      multimediaSquareS,
      multimediaLandscapeS,
    }
  })

  const params = {
    isAdmin,
    stories,
  }

  return <StoriesListLinkedByBrandChild {...params} />
}

StoriesListLinkedByBrand.propTypes = {
  customFields,
}

StoriesListLinkedByBrand.label = 'No te pierdas - por marca'

export default StoriesListLinkedByBrand
