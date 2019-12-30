import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import { includePromoItems } from '../../../utilities/included-fields'

import StoriesListLinkedBySiteChild from './_children/linked-by-site'

const StoriesListLinkedBySite = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
      isTargetBlank = false,
      titleField,
      subtitleField,
    } = {},
  } = props
  /**
   * TODO: Se podria agregar caso por defecto para que haga fetch
   * de las ultimas notas de Mag o del sitio actual.
   */

  const { website } = contentConfigValues
  const { siteUrl, siteName } = getProperties(website || arcSite) || {}

  const presets = 'landscape_s:234x161,square_s:150x150'
  const includedFields = `headlines.basic,promo_items.basic_html.content,${includePromoItems},websites.${website ||
    arcSite}.website_url`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
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
      websiteLink: `${siteUrl}${websiteUrl ||
        websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
      multimediaLazyDefault,
      multimediaSquareS,
      multimediaLandscapeS,
    }
  })

  const params = {
    isAdmin,
    siteName,
    stories,
    isTargetBlank: isTargetBlank ? { target: '_blank' } : {},
    titleField,
    subtitleField,
  }

  return <StoriesListLinkedBySiteChild {...params} />
}

StoriesListLinkedBySite.propTypes = {
  customFields,
}

StoriesListLinkedBySite.label = 'Recomendados por marca'
StoriesListLinkedBySite.static = true

export default StoriesListLinkedBySite
