import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

import StoriesListLinkedBySiteChild from './_children/linked-by-site'

const StoriesListLinkedBySite = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
      isTargetBlank = false,
    } = {},
  } = props
  /**
   * TODO: Se podria agregar caso por defecto para que haga fetch
   * de las ultimas notas de Mag o del sitio actual.
   */

  const { website } = contentConfigValues

  const { siteUrl } = getProperties(website || arcSite) || {}

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(website || arcSite),
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

    const { websites = {} } = story || {}
    const site = websites[website] || {}
    const websiteUrl = site.website_url || ''

    const {
      title,
      websiteLink,
      multimediaLazyDefault,
      multimediaSquareS,
      multimediaLandscapeS,
    } = storyData
    return {
      title,
      websiteLink: `${siteUrl}${websiteUrl || websiteLink}`,
      multimediaLazyDefault,
      multimediaSquareS,
      multimediaLandscapeS,
    }
  })

  const params = {
    isAdmin,
    stories,
    isTargetBlank: isTargetBlank ? { target: '_blank' } : {},
  }

  return <StoriesListLinkedBySiteChild {...params} />
}

StoriesListLinkedBySite.propTypes = {
  customFields,
}

StoriesListLinkedBySite.label = 'No te pierdas - por marca'

export default StoriesListLinkedBySite
